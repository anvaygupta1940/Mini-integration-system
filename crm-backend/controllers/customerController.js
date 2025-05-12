import Customer from "../models/Customer.js";


// create a new customer
export const addCustomer = async (req, res, next) => {
    try {
        const { name, email, address, phone } = req.body;
        const customer = new Customer({
            name,
            email,
            address,
            phone
        });
        const savedCustomer = await customer.save();
        // passing the customer data to webHook middleware
        req.customer = savedCustomer;
        next();
    } catch (error) {
        next(error);
    }
}

// get all customers
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
}
