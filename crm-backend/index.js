import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import customerRoute from './routes/customerRoute.js';
import errorHandler from './middlewares/errorHandler.js';


// middleware
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/customers", customerRoute);


// error-handling middleware
app.use(errorHandler);



// connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to CRM DB...");
    app.listen(process.env.PORT, () => {
        console.log(`CRM server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error("Error connecting to CRM DB:", err.message);
    process.exit(1);
})