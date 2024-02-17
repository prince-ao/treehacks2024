import { Elysia, t, NotFoundError } from "elysia";
import db from "../db";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import { PromptTemplate } from "@langchain/core/prompts";

const apiKey = process.env.TOGETHER_API_KEY;

const llm = new TogetherAI({
  apiKey: apiKey as string,
  modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1",
});

const prompt =
  PromptTemplate.fromTemplate(`System: You are a export pharmacologist. You are given some recommended medication data as json and you will return a format that looks like this:
yellow, green, red
"green" means that the patient isn't being recommended any serious medication in that category, "yellow" that somewhat serious medications are recommended, and "red" that serious medications are recommended.
the first index means cardiovascular health, the second index means metabolic health, the third index means respiratory health. Do not just copy the format. Keep everything lowercase. Do not explain yourself.
User: {input}
Pharmacologist:`);

const home = new Elysia().group("/home", (app) =>
  app.get(
    "/dashboard",
    async ({ headers, body, jwt, set }) => {
      const token = headers.authorization.split("Bearer ")[1];

      const user_ob = await jwt.verify(token);

      const user = await db.user.findFirst({
        where: {
          id: user_ob.user_id,
        },
      });

      if (!user) {
        set.status = 400;
        return "User not found";
      }

      const accounts = await db.terraAccount.findMany({
        where: {
          userId: user_ob.user_id,
        },
      });

      if (!accounts) {
        set.status = 400;
        return "No accounts found";
      }

      const recommendations = await db.medicationRecommendation.findMany({
        where: {
          userId: user_ob.user_id,
        },
      });

      let dashboard = {
        cardiovascular_health: {
          status: "green",
        },
        metabolic_health: {
          status: "green",
        },
        respiratory_health: {
          status: "green",
        },
      };

      if (recommendations.length > 0) {
        const chain = prompt.pipe(llm);
        const response = await chain.invoke({
          input: JSON.stringify(recommendations),
        });

        const regex = /\bgreen\b|\byellow\b|\bred\b/gi;
        const matches = response.match(regex) || ["green", "green", "green"];

        dashboard = {
          cardiovascular_health: {
            status: matches[0],
          },
          metabolic_health: {
            status: matches[1],
          },
          respiratory_health: {
            status: matches[2],
          },
        };
      }

      console.log(dashboard);

      return {
        user: {
          name: `${user.first_name} ${user.last_name}`,
          profile_image: user.profile_image,
        },
        dashboard,
      };
    },
    {
      headers: t.Object({
        authorization: t.String(),
      }),
    }
  )
);

export default home;
