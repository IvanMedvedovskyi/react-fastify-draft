import Fastify from "fastify";
import dotenv from "dotenv";

const app = Fastify();

dotenv.config();

app.get("/", async (request, reply) => {
  return { message: "API is working!" };
});

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT || 3000}`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
