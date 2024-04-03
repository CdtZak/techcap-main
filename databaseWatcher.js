// databaseWatcher.js
const { MongoClient } = require('mongodb');
const dotenv = require ('dotenv')
dotenv.config({path:'./config.env'})
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

async function startDatabaseWatcher() {
    // Connection URI
    const uri = DB

    // Create a new MongoClient
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to MongoDB
    await client.connect();

    const db = client.db('test');
    const orderCollection = db.collection('orders');

    // Create a change stream for the "order" collection
    const changeStream = orderCollection.watch();

    // Listen for changes
    changeStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
            console.log('New order added:', change.fullDocument);

            // Example: Send email notification using Nodemailer
            await sendEmailNotification(change.fullDocument);
        }
    });
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zaki0galaxy@gmail.com', 
        pass: 'xezz ifgi kmei kppl'   
    }
});

async function sendEmailNotification(newOrder) {
    try {
        
        const mailOptions = {
            from: 'zaki0galaxy@gmail.com',                 
            to: 'zaki0galaxy@gmail.com',              
            subject: 'New Order Notification',      
            text: `A new order has been added: ${JSON.stringify(newOrder)}` 
        };

        
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}
module.exports = { startDatabaseWatcher };
