const Expense = require("../models/expense");

exports.addExpense = async (req, res) => {
  const { title, amount, date } = req.body;
  try {
    const expense = await Expense.create({ title, amount, date });
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findAll();
    res.send(expense);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({ where: { id } });
    if (expense) res.send(expense);
    else res.status(404).send(`Expense with ID ${id} not found.`);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date } = req.body;
  try {
    await Expense.update({ title, amount, date }, { where: { id } });
    res.status(200).send("Expense updated successfully!");
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.destroy({ where: { id } });
    res.send(`Expense delete successfully `);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

exports.getTotalExpense = async (req, res) => {
  try {
    const totalExpense = await Expense.sum("amount");
    const expenseObject = [
      {
        totalExpense: totalExpense,
      },
    ];
    res.send(expenseObject);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
};

// exports.getTotalExpense = async (req, res) => {
//   try {
//     const totalExpense = await Expense.sum('amount');
//    res.send(`${totalExpense}`);

//   } catch (error) {
//     res.status(400).send(`Error: ${error.message}`);
//   }
// };

// exports.getTotalExpense = async (req, res) => {
//   try {
//     const totalExpense = await Expense.sum('amount');
//     const integerExpense = parseInt(totalExpense);
//     res.status(200).send(integerExpense);
//   } catch (error) {
//     res.status(400).send(`Error: ${error.message}`);
//   }
// };

// exports.getTotalExpense = async (req, res) => {
//   try {
//     const totalExpense = await Expense.sum('amount');
//     res.status(200).send(Number(totalExpense));
//   } catch (error) {
//     res.status(400).send(`Error: ${error.message}`);
//   }
// };

// exports.getTotalExpense = async (req, res) => {
//   try {
//     const totalExpense = await Expense.sum('amount');
//    // res.send(`Total expense: ${totalExpense}`);
//    res.send(Number(totalExpense));
//   } catch (error) {
//     res.status(400).send(`Error: ${error.message}`);
//   }
// };
