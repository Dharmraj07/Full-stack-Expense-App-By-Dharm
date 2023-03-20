const express = require("express");
const bodyParser = require("body-parser");
const expenseRoutes = require("./routes/expenseRoutes");
const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", expenseRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`Expense Tracker api is Listening at http://localhost:${port}`);
});
