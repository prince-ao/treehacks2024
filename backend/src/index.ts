import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { auth, account, webhook, home } from "./groups";

const app = new Elysia().use(swagger({ path: "/docs" })).use(
  jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET as string,
    exp: "7d",
  })
);
const PORT = 3000;

app.get("/", () => "Hello from PrescriptionRx API");
app.use(auth);
app.use(account);
app.use(webhook);
app.use(home);

app.listen(PORT, (s) => console.log(`🦊 Elysia is running at ${PORT}`));
