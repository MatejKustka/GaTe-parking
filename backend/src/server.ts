import 'dotenv/config';
import { createApp } from './app.js';
import { connectDb } from './db.js';

const port = Number(process.env.BACKEND_PORT ?? 8080);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/gate-parking';

await connectDb(mongoUri);
createApp().listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
