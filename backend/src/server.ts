import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.js";
import { connectDb } from "./db.js";

// The one .env lives in the repo root, whichever folder the server is started from.
config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const port = Number(process.env.BACKEND_PORT ?? 8080);
const mongoUri =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/gate-parking";

await connectDb(mongoUri);
createApp().listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
