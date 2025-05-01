const dotenv = require("dotenv")
const sendMail = require("../helpers/sendMail")
const Expense = require("../models/Expense")
dotenv.config();

const expenseEmail = async () => {
    const expenses = await Expense.find();

    const totalExpense = expenses.reduce(
        (acc, expense) => {
            acc + expense.value, 0
        }
    )
    if (totalExpense > 10000) {
        let messageOptions = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "warning",
            text: `Your Total Expenses is${totalExpense}.Please Review Your Expenses`
        }
        await sendMail(messageOptions);
    }
}


module.exports = expenseEmail;