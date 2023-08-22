const app = require("./app");
const connectDB = require("./config/db");
const { SERVER_PORT } = require("./secret");

app.listen(SERVER_PORT, async () => {
  console.log(`App listening on http://localhost:${SERVER_PORT}!`);
  await connectDB();
});
