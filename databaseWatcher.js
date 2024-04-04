// databaseWatcher.js
const { MongoClient } = require('mongodb');
const nodemailer = require("nodemailer");
const dotenv = require ('dotenv')
dotenv.config({path:'./config.env'})
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

async function startDatabaseWatcher() {
    // Connection URI
    const uri = DB

    // Create a new MongoClient
    const client = new MongoClient(uri);

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
        const emailBody = `
            <h2>New Order Notification</h2>
            <p>A new order has been added:</p>
            <ul>
                <li><strong>Order ID:</strong> ${newOrder._id}</li>
                <li><strong>Full Name:</strong> ${newOrder.fullname}</li>
                <li><strong>Phone Number:</strong> ${newOrder.number}</li>
                <li><strong>Wilaya:</strong> ${newOrder.wiliya}</li>
                <li><strong>Status:</strong> ${newOrder.status}</li>
                <li><strong>Product ID:</strong> ${newOrder.productId}</li>
                <li><strong>Created At:</strong> ${newOrder.createdAt}</li>
            </ul>
        `;
        const mailOptions = {
            from: 'zaki0galaxy@gmail.com',                 
            to: 'zaki0galaxy@gmail.com',              
            subject: 'New Order Notification',      
            html: emailBody
        };

        
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}
module.exports = { startDatabaseWatcher };
