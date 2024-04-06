const express = require('express')
const adminController = require('./../controllers/adminController')


const router = express.Router()

router.get('/admin',adminController.getAdmin)
router.delete('/deleteProduct',adminController.deleteProduct)

module.exports=router