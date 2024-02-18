import { Elysia, t, NotFoundError } from "elysia";
import db from "../db";

const medication = new Elysia().group("/medication", (app) =>
  app.get(
    "/recommendations",
    async ({ query }) => {
      const token = query.authorization.split("Bearer ")[1];
      const token_decode = jwt.verify(token);
      const recommended_medications =
        await db.medicationRecommendation.findMany({
          where: {
            userId: token_decode.token,
          },
        });

      return recommended_medications;
    },
    {
      query: t.Object({
        authorization: t.String(),
      }),
    }
  )
);

export default medication;
