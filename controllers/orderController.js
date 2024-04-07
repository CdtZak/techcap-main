const { status } = require('express/lib/response')
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
exports.updateOrder = async (req,res,next) =>{
    try{
        
        const orderId = req.body.orderId 
        const newState = req.body.state;
       
        const updatedOrder = await order.findByIdAndUpdate(orderId, { status: newState });
        if (!updatedOrder) {
            return res.status(404).json({
                status: 'failed',
                message: 'Order not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedOrder
        });

    }catch(err){
        
        res.status(500).json({
            status:'failed',
            error:err,
            message:'order was not updated ! try again '
        })
    }
}
exports.deleteOrder = async(req,res,next)=>{
    try{
        const deletedOrder = await order.findByIdAndDelete(req.body.orderId);
        res.status(200).json({ message: "Product deleted successfully", deletedOrder });
    }catch(err){
        res.status(500).json({
            status:'failed',
            error:err,
            message:'order was not deleted ! try again '
        })
    }
}