const express = require('express');
const { testFunc } = require('../controllers/trackerController')

const router = express.Router()


router.get('/', testFunc)

router.post('/', testFunc)

router.delete('/', testFunc)

router.patch('/', testFunc)


module.exports = router;