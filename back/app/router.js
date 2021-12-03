const express = require('express');
const router = express.Router();

// created a error class to generate customized error (statusCode, message)
const ErrorHandler = require('./error/ErrorHandler');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const expenseController = require('./controllers/expenseController');

router.post('/api/signup', userController.signup);
router.post('/api/login', userController.login);

router.post('/api/category', categoryController.createOne);
router.patch('/api/category', categoryController.updateOne);
router.delete('/api/category', categoryController.deleteOne);

router.post('/api/expense', expenseController.createOne);
router.patch('/api/expense', expenseController.updateOne);
router.delete('/api/expense', expenseController.deleteOne);


router.all('*', (req, res, next) => {
    const error = new ErrorHandler(404, 'Invalid endpoints.');
    next(error);
})

// middleware use to handle errors
router.use((error, req, res, next) => {
    // check if the error is an instance of ErrorHandler, if yes it means i created a specific error with specific status and message
    // if not it means the error comes from another place so i send a generic code and message (in order to avoid database or weird error sent back to the client) 
    if(error instanceof ErrorHandler) {
        return res.status(error.statusCode).send(error.message)
    }
    return res.status(500).send('Une erreur s\'est produite. Veuillez réessayer.');

})

module.exports = router;