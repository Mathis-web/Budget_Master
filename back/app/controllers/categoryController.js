const Category = require('../models/Category');

const categoryController = {
    async createOne(req, res, next) {
        try {
            req.body.userId = req.user.id;
            const category = new Category(req.body);
            const categoryInfos = await category.save();
            res.status(200).send(categoryInfos);
        } catch (error) {
            next(error);
        }
    },

    async updateOne(req, res, next) {
        try {
            const category = new Category(req.body);
            const categoryInfos = await category.update();
            res.status(200).send(categoryInfos);
        } catch (error) {
            next(error);
        }
    }, 

    async deleteOne(req, res, next) {
        try {
            const category = new Category(req.body);
            const categoryInfos = await category.delete();
            res.status(200).send(categoryInfos);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = categoryController;