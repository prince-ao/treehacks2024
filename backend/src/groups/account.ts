import { Elysia, t, NotFoundError } from "elysia";

import db from "../db";

const account = new Elysia().group("/accounts", (app) =>
  app
    .post(
      "/",
      async ({ headers, body, jwt }) => {
        const token = headers.Authorization.split("Bearer ")[1];

        const user_ob = await jwt.verify(token);

        await db.terraAccount.create({
          data: {
            terraUserId: body.terra_user_id,
            terraResource: body.terra_resource,
            terraReferenceId: body.terra_resource_id,
            userId: user_ob.user_id,
          },
        });

        return { message: "success" };
      },
      {
        headers: t.Object({
          Authorization: t.String(),
        }),
        body: t.Object({
          terra_user_id: t.String(),
          terra_resource: t.String(),
          terra_resource_id: t.String(),
        }),
      }
    )
    .get(
      "/",
      async ({ headers, jwt }) => {
        const token = headers.Authorization.split("Bearer ")[1];

        const user_ob = await jwt.verify(token);

        const accounts = await db.terraAccount.findMany({
          where: {
            userId: user_ob.user_id,
          },
        });

        return accounts.map(({ terraReferenceId, terraResource, userId }) => ({
          user_id: userId,
          resource: terraResource,
          resource_id: terraReferenceId,
        }));
      },
      {
        headers: t.Object({
          Authorization: t.String(),
        }),
      }
    )
);

export default account;
