import { Elysia, t, NotFoundError } from "elysia";

import db from "../db";

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
