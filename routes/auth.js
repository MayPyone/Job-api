const express = require('express')
const router = express.Router()
const {register, login, verifiedEmail} = require('../controllers/auth')
router.post('/register',register)
router.post('/login',login)
router.get('/:id/verify/:token/',verifiedEmail)

module.exports  = router