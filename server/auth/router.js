const express = require('express')
const router = express.Router();
const {signUp} = require('./controller')
router.post('/api/signup', signUp)
router.post('/api/signin', signUp)

module.exports = router