const express = require('express')
const router = express.Router();
const writeDataCountry = require('./seed')

const {getAllCountries} = require('./controller')

router.get('/api/country', getAllCountries)


module.exports = router