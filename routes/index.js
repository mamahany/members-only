const {Router} = require('express');
const router = Router();
const indexController = require('../controllers/indexController');
const {isAuth, isAdmin} = require('./authMiddleWare')

router.get('/', indexController.getAllMessages);
router.get('/new', isAuth, indexController.addMessageGet);
router.post('/new', isAuth, indexController.addMessagePost);
router.get('/delete/:id', isAdmin, indexController.deleteMessage);

module.exports = router;