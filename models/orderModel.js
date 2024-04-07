const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
       
    },
   
   

    
    number:{
        type:String,
        required: true
        
    },
    wiliya:{
        type:String,
        required: true
    },
    status:{
        type: String,
        enum: ['Unconfirmed', 'Confirmed', 'Delivered'], 
        default: 'Unconfirmed'
    },
    productId:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})
const order = mongoose.model('order',orderSchema)
module.exports = order