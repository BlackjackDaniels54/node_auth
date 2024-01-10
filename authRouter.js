const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleWare = require('./middleware/roleMiddleware');

router.post('/registration', [

    check('username', "Username field can't be empty").notEmpty(),
    check('password', "Password length must be longer than 4 and shorter than 10 characters").isLength({min: 4, max: 10})

], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleWare(['USER', 'ADMIN']), controller.getUsers)

module.exports = router 