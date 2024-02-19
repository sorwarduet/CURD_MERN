const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = require("./app");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
