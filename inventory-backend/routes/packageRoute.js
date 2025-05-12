import express from 'express';
import { getPackages, createPackageFromWebhook } from '../controllers/packageController.js';

const router = express.Router();

// create a new package from customer data
router.post('/webhook', createPackageFromWebhook);


// GET all packages
router.get('/', getPackages);



export default router;