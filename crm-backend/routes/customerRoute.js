import express from 'express';
import { addCustomer, getAllCustomers } from '../controllers/customerController.js';
import notifyInventory from '../middlewares/webHookTrigger.js';

const router = express.Router();

// create new customer
router.post("/", addCustomer, notifyInventory);

// get all customers
router.get('/', getAllCustomers);


export default router;
