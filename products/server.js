require("dotenv").config({ path: "./.env" });
const connectDB = require("./src/config/db");

const app = require("./src/app");
const main = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: running at http://localhost:${process.env.PORT}  ${process.env.NODE_ENV}`
    );
  });
};
main().catch((err) => {
  console.log(err);
});
