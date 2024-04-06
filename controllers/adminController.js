const admin = require('../models/adminModel')
const order= require('../models/orderModel')
const pc  = require('../models/pcModel')
exports.getAdmin =  async(req,res,next)=>{
    try{
        const pcs = await pc.find()
        const orders = await order.find()
        res.render('admin',{products: pcs, orders: orders})
    }catch(err){
        
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.body.productId;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const deletedProduct = await pc.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while deleting the product" });
    }
};