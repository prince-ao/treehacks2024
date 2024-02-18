import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { auth, account, webhook, home, device } from "./groups";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(swagger({ path: "/docs" }))
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET as string,
      exp: "7d",
    })
  )
  .onRequest((e) => {
    console.log(e);
  });
const PORT = 3000;

app.get("/", () => "Hello from PrescriptionRx API");
app.use(auth);
app.use(account);
app.use(webhook);
app.use(home);
app.use(device);

app.listen(PORT, (s) => console.log(`🦊 Elysia is running at ${PORT}`));
