const express = require('express')
const orderController = require('./../controllers/orderController')


const router = express.Router()

router.post('/addOrder',orderController.addOrder)
router.patch('/updateOrder',orderController.updateOrder)
router.delete('/deleteOrder',orderController.deleteOrder)
module.exports=router