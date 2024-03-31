const express = require('express')
const pcController = require('./../controllers/pcController')
const pc = require('../models/pcModel')

const router = express.Router()
router.get('/getUrl',pcController.getUrl)
router.post('/addpc',pcController.addPc)
router.get('/product/:id',pcController.getProduct)
module.exports=router