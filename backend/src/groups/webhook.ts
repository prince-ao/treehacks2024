import { Elysia, t } from "elysia";

const webhook = new Elysia().group("/consumeTerraWebhook", (app) =>
  app.post("/", ({ body, set }) => {
    console.log(body);
    set.status = 200;
    return;
  })
);

export default webhook;
