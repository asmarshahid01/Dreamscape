const {analytics,user} = require('../controllers/adminController')
const express = require('express')
const { checkAdminAuth } = require('../middlewares/checkAdminAuth')

const router = express.Router()

router.get('/analytics', checkAdminAuth, analytics)
router.get('/user', checkAdminAuth, user)

module.exports = router