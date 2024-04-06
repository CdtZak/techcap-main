const mongoose = require('mongoose')
const pcSchema = new mongoose.Schema({
    name:{
        type:String,
       
    },
   
    specs: {
        cpu: {
            type: String,
           
        },
        gpu: {
            type: String,
            
        },
        ram: {
            type: String,
            
        },
        screen: {
            type: String,
            
        },
        storage:{
            type: String,
            
        },
        ref:{
            type:String,
           
        },
        state:{
            type:String,
           
        },
    },
    images:[{
        type:String,
        }],
    price:{
        type:Number,
        
    },
    available:{
        type:Boolean,
        default:true
    }
})
const pc = mongoose.model('pc',pcSchema)
module.exports = pc