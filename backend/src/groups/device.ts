import { Elysia, t, NotFoundError } from "elysia";

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

  const nutrition_response = await fetch(
    "https://api.tryterra.co/v2/nutrition?to_webhook=false&user_id=${terraId}",
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
  const nutrition = await nutrition_response.json();

  const cardio_query: string = `I would like to analyze this data and give me a list of medications that you would recommend for me in the category of cardiovascular health.
    The format should be in json and should look like this:
    [{
        medication_name: "",
        reason_for_recommendation: "",
        recommended_dosage: ""
    }, ...]
    if you have no suggestions then return an empty array. Please do not add anything superfluous.
    Data: ${JSON.stringify(body)}`;

  const meta_query: string = `I would like to analyze 2 data and give me a list of medications that you would recommend for me in the category of metabolic health.
    The format should be in json and should look like this:
    [{
        medication_name: "",
        reason_for_recommendation: "",
        recommended_dosage: ""
    }, ...]
    if you have no suggestions then return an empty array. Please do not add anything superfluous.
    Data1: ${JSON.stringify(body)}
    Data2: ${JSON.stringify(nutrition)}`;

  const rest_query: string = `I would like to analyze 2 data and give me a list of medications that you would recommend for me in the category of metabolic health.
    The format should be in json and should look like this:
    [{
        medication_name: "",
        reason_for_recommendation: "",
        recommended_dosage: ""
    }, ...]
    if you have no suggestions then return an empty array. Please do not add anything superfluous.
    Data1: ${JSON.stringify(body)}`;

  const cardio_model_response = await fetch(
    "https://84d839fa-9eff-4a85-b8c7-cd5c88a917f3.monsterapi.ai/generate",
    {
      headers: { Authorization: `Bearer ${process.env.MONSTER_KEY}` },
      method: "POST",
      body: JSON.stringify({ prompt: cardio_query }),
    }
  );

  const meta_model_response = await fetch(
    "https://84d839fa-9eff-4a85-b8c7-cd5c88a917f3.monsterapi.ai/generate",
    {
      headers: { Authorization: `Bearer ${process.env.MONSTER_KEY}` },
      method: "POST",
      body: JSON.stringify({ prompt: meta_query }),
    }
  );

  const rest_model_response = await fetch(
    "https://api-inference.huggingface.co/models/medicalai/ClinicalBERT",
    {
      headers: { Authorization: `Bearer ${process.env.MONSTER_KEY}` },
      method: "POST",
      body: JSON.stringify({ prompt: rest_query }),
    }
  );

  const cardio_model = await cardio_model_response.json();
  const meta_model = await meta_model_response.json();
  const rest_model = await rest_model_response.json();

  const cardio = JSON.parse(cardio_model);
  const meta = JSON.parse(meta_model);
  const rest = JSON.parse(rest_model);

  db.medicationRecommendation.createMany({
    data: [
      {
        userId,
        recommendedDosage: cardio.recommended_dosage,
        dateOfRecommendation: new Date(),
        price: "0",
        reasonForRecommendation: cardio.reason_for_recommendation,
        medicationImage: "",
        medicationName: cardio.medication_name,
      },
      {
        userId,
        recommendedDosage: meta.recommended_dosage,
        dateOfRecommendation: new Date(),
        price: "0",
        reasonForRecommendation: meta.reason_for_recommendation,
        medicationImage: "",
        medicationName: meta.medication_name,
      },
      {
        userId,
        recommendedDosage: rest.recommended_dosage,
        dateOfRecommendation: new Date(),
        price: "0",
        reasonForRecommendation: rest.reason_for_recommendation,
        medicationImage: "",
        medicationName: rest.medication_name,
      },
    ],
  });
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
