const pc = require('../models/pcModel')


exports.getUrl = async (req,res,next)=>{
    try{
        const data = await pc.find(); // Replace 'YourModel' with the actual name of your Mongoose model
        
        // Extract images from the data
        const images = data.map(item => ({
            url: item.images[0], // Extract the first image URL
            id: item._id // Extract the ID of the element
        }));
        
        // Respond with a JSON containing the extracted images
        res.status(200).json({
            status: 'success',
            data:images,
            imgOne:images[0],
            imgTwo:images[1],
            imgThree:images[2],
})
    }
    catch(err){
        res.status(500).json({
            status: 'error',
            message: 'couldnt retrive pictures'
        });

    }
}
exports.addPc = async(req,res,next) =>{
    try{
        const newPc = await pc.create({
            name:req.body.name,
            specs:req.body.specs,
            images:req.body.images,
            price:req.body.price,
            
        })
        res.status(201).json({
            status:'sucess',
            data:{
                pc: newPc
            }
        })
    }catch(err){
        res.status(404).json({
            error:err,
            message:'pc was not added ! '
        })
    }
}
exports.getProduct = async(req,res,next)=>{
    try{
        const product = await pc.findById(req.params.id)
        res.render('product',{data:product})
    }catch(err){
        

    }
}