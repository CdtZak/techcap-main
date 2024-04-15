const admin = require('../models/adminModel')
const order= require('../models/orderModel')
const pc  = require('../models/pcModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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
exports.createAdmin = async (req,res,next) =>{
    const { username, password } = req.body;

    try {
       
        const existingAdmin = await admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new admin({ username, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Error creating admin' });
    }

}
exports.login = async (req,res,next) =>{
    res.render('login')
}
exports.auth = async (req,res,next)=>{
    
    const { username, password } = req.body;

    try {
        
        const Admin = await admin.findOne({ username });
       if (!Admin) {
            return res.status(404).send('Admin not found');
        }

        
        const passwordMatch = await bcrypt.compare(password, Admin.password);
        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }

        
        const token = jwt.sign({ userId: Admin._id }, 'secret-key', { expiresIn: '1h' });
        
    
       res.cookie("token",token,{
            httpOnly:true,
            
        })
        
        
        res.status(201).json({ token });
        
        
        
    } catch (error) {
        res.status(500).send('Error logging in');
    }


}
exports.protect = (req, res, next) => {
    
console.log(req.headers.cookie)
   let token = req.headers.cookie.split('=')[1];
    
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        
        const decodedToken = jwt.verify(token, 'secret-key');

       
        req.userId = decodedToken.userId;

       
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};