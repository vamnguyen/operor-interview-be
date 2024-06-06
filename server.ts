import { app } from "./src";
// import { env } from "./src/utils/envConfig";
import { prisma } from "./src/utils/prismaConfig";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => console.log("Server has been terminated"));
});
