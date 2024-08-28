const router = require('express').Router();
const userController = require('../controllers/userController');
const authenticationMiddleWare = require('../middlewares/authenticationMiddleware');

router.route('/signup')
    .post(userController.signUp);

router.route('/login')
    .post(userController.login);

router.route('/:memberId')
    .all(authenticationMiddleWare)
    .put(userController.updateUser)
    .get(userController.getUser)
    .delete(userController.deleteUser);

module.exports = router;


/// http://localhost:3000/users/signup

//  {
// "name": "renu"
// "email":" yfgey"
// ....}