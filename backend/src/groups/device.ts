import { Elysia, t, NotFoundError } from "elysia";
// import { TogetherAI } from "@langchain/community/llms/togetherai";
// import { PromptTemplate } from "@langchain/core/prompts";

// const apiKey = process.env.TOGETHER_API_KEY;

// const llm = new TogetherAI({
//   apiKey: apiKey as string,
//   modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1",
// });

import db from "../db";

async function initializeRecommendedDatabase(userId: number, terraId: string) {
  const body_response = await fetch(
    `https://api.tryterra.co/v2/body?to_webhook=false&user_id=${terraId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "dev-id": process.env.TERRA_DEV_KEY!,
        "x-api-key": process.env.TERRA_API_KEY!,
      },
    }
  );
  const body = await body_response.json();
  //   const nutrition_response = await fetch(
  //     "https://api.tryterra.co/v2/nutrition?to_webhook=false&user_id=${terraId}",
  //     {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         "dev-id": process.env.TERRA_DEV_KEY!,
  //         "x-api-key": process.env.TERRA_API_KEY!,
  //       },
  //     }
  //   );
  //   const body = await body_response.json();
  //   const nutrition = await nutrition_response.json();
  const cardio_query: string = `System: Based on the provided patient data, generate a list of recommended medications specifically for cardiovascular health. Ensure that these recommendations adhere to established medical guidelines and consider any patient-specific factors such as age, existing conditions, or contraindications. The output should be in JSON format, as shown below:

[
    {
        "medication_name": "",
        "reason_for_recommendation": "",
        "recommended_dosage": "",
        "price_estimate": ""
    },
    ...
]

If there are no suitable medication recommendations, return an empty array. Please do not include any superfluous information. Note that these recommendations should be verified by a medical professional.

Data: ${JSON.stringify(body)}
System:`;
  //   const meta_query: string = `I would like to analyze 2 data and give me a list of medications that you would recommend for me in the category of metabolic health.
  //     The format should be in json and should look like this:
  //     [{
  //         medication_name: "",
  //         reason_for_recommendation: "",
  //         recommended_dosage: ""
  //     }, ...]
  //     if you have no suggestions then return an empty array. Please do not add anything superfluous.
  //     Data1: ${JSON.stringify(body)}
  //     Data2: ${JSON.stringify(nutrition)}`;
  //   const rest_query: string = `I would like to analyze 2 data and give me a list of medications that you would recommend for me in the category of metabolic health.
  //     The format should be in json and should look like this:
  //     [{
  //         medication_name: "",
  //         reason_for_recommendation: "",
  //         recommended_dosage: ""
  //     }, ...]
  //     if you have no suggestions then return an empty array. Please do not add anything superfluous.
  //     Data1: ${JSON.stringify(body)}`;
  const cardio_model_response = await fetch(
    "https://84d839fa-9eff-4a85-b8c7-cd5c88a917f3.monsterapi.ai/generate",
    {
      headers: { Authorization: `Bearer ${process.env.MONSTER_KEY}` },
      method: "POST",
      body: JSON.stringify({ prompt: cardio_query }),
    }
  );

  try {
    const response = await cardio_model_response.text();
    const data = JSON.parse(response);

    db.medicationRecommendation.createMany({
      data: data.map((d: any) => ({
        userId,
        recommendedDosage: d.recommended_dosage,
        dateOfRecommendation: new Date(),
        price: d.price_estimate,
        reasonForRecommendation: d.reason_for_recommendation,
        medicationImage:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst.depositphotos.com%2F1979759%2F3725%2Fi%2F450%2Fdepositphotos_37253041-stock-photo-medical-pill.jpg&f=1&nofb=1&ipt=98e0d21974aa961386933a5d49b4df86b276ccb60d8ec47aa971e33935f55a7e&ipo=images",
        medicationName: d.medication_name,
      })),
    });
  } catch (e) {}
  //   const meta_model_response = await fetch(
  //     "https://84d839fa-9eff-4a85-b8c7-cd5c88a917f3.monsterapi.ai/generate",
  //     {
  //       headers: { Authorization: `Bearer ${process.env.MONSTER_KEY}` },
  //       method: "POST",
  //       body: JSON.stringify({ prompt: meta_query }),
  //     }
  //   );
  //   const rest_model_response = await fetch(
  //     "https://api-inference.huggingface.co/models/medicalai/ClinicalBERT",
  //     {
  //       headers: { Authorization: `Bearer ${process.env.MONSTER_KEY}` },
  //       method: "POST",
  //       body: JSON.stringify({ prompt: rest_query }),
  //     }
  //   );
  //   const prompt = PromptTemplate.fromTemplate(cardio_query);
  //   const chain = prompt.pipe(llm);
  //   const response = await chain.invoke({
  //     input: JSON.stringify(body),
  //   });
  //   const meta_model = await meta_model_response.json();
  //   const rest_model = await rest_model_response.json();
  //   const cardio = JSON.parse(response);
  //   const meta = JSON.parse(meta_model);
  //   const rest = JSON.parse(rest_model);
  //   db.medicationRecommendation.createMany({
  //     data: cardio.map((c: any) => ({
  //       userId,
  //       recommendedDosage: c.recommended_dosage,
  //       dateOfRecommendation: new Date(),
  //       price: "0",
  //       reasonForRecommendation: c.reason_for_recommendation,
  //       medicationImage: "",
  //       medicationName: c.medication_name,
  //     })),
  //   });
}

const device = new Elysia().group("/device", (app) =>
  app.get(
    "/auth",
    async ({ query, jwt, set }) => {
      const token = query.reference_id.split("Bearer ")[1];

      try {
        const user_ob = await jwt.verify(token);
        db.terraAccount.create({
          data: {
            userId: user_ob.user_id,
            terraUserId: query.user_id,
            terraResource: query.resource,
            terraReferenceId: query.reference_id,
          },
        });

        initializeRecommendedDatabase(user_ob.user_id, query.user_id);

        return "Success. Please Exit.";
      } catch (e) {
        set.status = 400;
        return "Unable to verify user";
      }
    },
    {
      query: t.Object({
        user_id: t.String(),
        reference_id: t.String(),
        resource: t.String(),
      }),
    }
  )
);

export default device;
