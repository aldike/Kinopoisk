const express = require('express')
const router = express.Router();
const {saveToWatch} = require('./controller')

router.post('/api/savetoWatch', saveToWatch)

module.exports = router