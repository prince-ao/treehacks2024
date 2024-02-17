import { Elysia, t } from "elysia";
import Terra from "terra-api";

const API_KEY = process.env.TERRA_API_KEY;
const DEV_ID = process.env.TERRA_DEV_KEY;
const SECRET = process.env.TERRA_SECRET;

const terra = new Terra(DEV_ID as string, API_KEY as string, SECRET as string);

const webhook = new Elysia().group("/consumeTerraWebhook", (app) =>
  app.post("/", ({ body, set }) => {
    console.log(body);
    set.status = 200;
    return;
  })
);

export default webhook;
