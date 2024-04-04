const express = require('express')
const app = express()
const { startDatabaseWatcher } = require('./databaseWatcher');
const cors = require ('cors')
const pcRouter = require('./routes/pcRoutes')
const orderRouter = require('./routes/orderRoutes')
const path = require('path')
app.use(cors())
app.set('view engine','ejs')
app.use(express.json())
app.use(express.static(path.join(__dirname,'Public')))
app.get('/',(req,res)=>{
    res.send('welcome to tech captain ! ')
})
app.use('/',pcRouter,orderRouter)
// Initialize the database watcher
startDatabaseWatcher().catch(err => {
    console.error('Error starting database watcher:', err);
    process.exit(1); // Exit the application if an error occurs during initialization
});
module.exports = app;