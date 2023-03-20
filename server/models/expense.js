const Sequelize = require("sequelize");
const sequelize = new Sequelize("tree20m", "root", "#@Dharm007", {
  host: "localhost",
  dialect: "mysql",
});

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});
sequelize.sync();
// Define a function to handle errors
function handleError(error) {
  console.error("Error: ", error);
}

module.exports = Expense;
