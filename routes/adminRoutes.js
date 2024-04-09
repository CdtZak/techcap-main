const express = require('express')
const adminController = require('./../controllers/adminController')


const router = express.Router()

router.get('/admin',adminController.protect,adminController.getAdmin)
router.delete('/deleteProduct',adminController.deleteProduct)
router.post('/createAdmin',adminController.createAdmin)
router.get('/login',adminController.login)
router.post('/auth',adminController.auth)

module.exports=router