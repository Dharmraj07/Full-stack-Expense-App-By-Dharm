const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getTotalExpense
} = require("../controllers/expenseController");
router.post("/", addExpense);
router.get("/total",getTotalExpense);
router.get("/", getExpense);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
//router.get("/total",getTotalExpense);

module.exports = router;
