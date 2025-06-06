import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import packageRoute from './routes/packageRoute.js';
import errorHandler from './middlewares/errorHandler.js';



// middleware
dotenv.config();
const app = express();
app.use(express.json());


// allowing cross-origin requests
const corsOptions = {
    origin: process.env.FRONTEND_URL, // e.g., https://deploy-mern-frontend.vercel.app
    methods: ["GET", "POST"]
};
app.use(cors(corsOptions));


// Routes
app.use('/api/packages', packageRoute);

// error-handling middleware
app.use(errorHandler);


// connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Inventory DB...");
    app.listen(process.env.PORT, () => {
        console.log(`Inventory server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error("Error connecting to Inventory DB:", err.message);
    process.exit(1);
})