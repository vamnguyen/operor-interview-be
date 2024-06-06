import { app } from ".";
import { env } from "~/utils/envConfig";
import { prisma } from "./utils/prismaConfig";

const server = app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => console.log("Server has been terminated"));
});
