const {Router} = require('express');
const router = Router();
const authController = require('../controllers/authController');
const {isAuth} = require('./authMiddleWare')

router.get('/sign-up', authController.signUpGet);
router.post('/sign-up', authController.signUpPost);
router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logout);
router.get('/join-community', isAuth, authController.joinCommunityGet);
router.post('/join-community', isAuth, authController.joinCommunityPost);
router.get('/become-admin', isAuth, authController.addAdminGet);
router.post('/become-admin', isAuth, authController.addAdminPost);

module.exports = router;