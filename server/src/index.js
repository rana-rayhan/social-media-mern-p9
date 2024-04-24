const app = require("./app");
const connectDB = require("./config/db");
const SERVER_PORT = 4000;

app.listen(SERVER_PORT, async () => {
  console.log(`App listening on http://localhost:${SERVER_PORT}!`);
  await connectDB();
});
