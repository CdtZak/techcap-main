const order = require('../models/orderModel')
exports.addOrder = async(req,res,next)=>{
    try{
        const newOrder = await order.create({
            fullname:req.body.fullname,
            wiliya:req.body.wiliya,
            number:req.body.number,
            productId: req.body.productId
            
            
        })
        res.status(201).json({
            status:'sucess',
            data:{
                message:'order submitted we will contact you briefly ',
                order: newOrder
            }
        })
    }
    catch(err){
        res.status(500).json({
            status:'failed',
            error:err,
            message:'order was not submitted ! try again '
        })
    }
}