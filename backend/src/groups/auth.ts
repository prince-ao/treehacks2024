import { Elysia, t, NotFoundError } from "elysia";

import db from "../db";

const auth = new Elysia().group("/auth", (app) =>
  app
    .post(
      "/login",
      async ({ body, set, jwt }) => {
        const user = await db.user.findFirst({
          where: {
            email: body.email,
          },
        });

        if (!user) {
          set.status = 400;
          return "User not found";
        }

        const isMatch = await Bun.password.verify(body.password, user.password);

        if (!isMatch) {
          set.status = 400;
          return "Incorrect password";
        }

        const token = await jwt.sign({
          id: user.id,
        });

        return {
          token,
        };
      },
      {
        detail: {
          tags: ["Auth"],
        },
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      }
    )
    .post(
      "/signup",
      async ({ body, set, jwt }) => {
        if (await db.user.findFirst({ where: { email: body.email } })) {
          set.status = 400;
          return "User already exists";
        }

        const hashed_password = await Bun.password.hash(body.password);
        const current_date = new Date();

        const new_user = await db.user.create({
          data: {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed_password,
            profile_image:
              "https://avatars3.githubusercontent.com/u/1071625?s=400&u=f19e921ec34fc145d2b0b05f6cdd3472240c885b&v=4",
            created: current_date,
          },
        });

        const token = await jwt.sign({
          id: new_user.id,
        });

        return {
          token,
        };
      },
      {
        detail: {
          tags: ["Auth"],
        },
        body: t.Object({
          first_name: t.String(),
          last_name: t.String(),
          email: t.String(),
          password: t.String(),
        }),
      }
    )
);

export default auth;
