const router = require('express').Router();
const User = require('../controllers/user.controller')
const auth = require('../middleware/auth');
const app = require('express')();

router.get('/logout', User.logout)

router.post('/login', User.login)

router.get('/all', auth, User.all)


module.exports = router;