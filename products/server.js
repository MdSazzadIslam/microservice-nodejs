require("dotenv").config({ path: "./.env" });
const connectDB = require("./src/config/db");

const app = require("./src/app");
const main = async () => {
  await connectDB();

  app.get("/", (req, res) => {
    res.send("Product service is running");
  });
  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: Product service is running at port :${process.env.PORT}  ${process.env.NODE_ENV}`
    );
  });
};
main().catch((err) => {
  console.log(err);
});
