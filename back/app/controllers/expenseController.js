const Expense = require('../models/Expense');

const expenseController = {
    async createOne(req, res, next) {
        try {
            const expense = new Expense(req.body);
            const expenseInfos = await expense.save();
            res.status(200).send(expenseInfos);
        } catch (error) {
            next(error);
        }
    },

    async updateOne(req, res, next) {
        try {
            const expense = new Expense(req.body);
            const expenseInfos = await expense.update();
            res.status(200).send(expenseInfos);
        } catch (error) {
            next(error);
        }
    }, 

    async deleteOne(req, res, next) {
        try {
            const expense = new Expense(req.body);
            const expenseInfos = await expense.delete();
            res.status(200).send(expenseInfos);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = expenseController;