import { app } from "./src";
// import { env } from "./src/utils/envConfig";
import { prisma } from "./src/utils/prismaConfig";

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => console.log("Server has been terminated"));
});
