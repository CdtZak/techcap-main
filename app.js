const express = require('express')
const app = express()
const { startDatabaseWatcher } = require('./databaseWatcher');
const cors = require ('cors')
const pcRouter = require('./routes/pcRoutes')
const orderRouter = require('./routes/orderRoutes')
const adminRouter = require('./routes/adminRoutes')
const path = require('path')
const cookieParser = require("cookie-parser")
//MIDDELWARE
app.use(cors())
app.set('view engine','ejs')
app.use(express.json())
app.use(express.static(path.join(__dirname,'Public')))
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.send('welcome to tech captain ! ')
})
app.use('/',pcRouter,orderRouter,adminRouter)

// Initialize the database watcher
startDatabaseWatcher().catch(err => {
    console.error('Error starting database watcher:', err);
    process.exit(1); // Exit the application if an error occurs during initialization
});
module.exports = app;