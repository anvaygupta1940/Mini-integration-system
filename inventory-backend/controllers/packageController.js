import Package from "../models/Package.js";
import { sendWelcomePackageEmail } from "../utils/emailService.js";


// create a new package from customer data
export const createPackageFromWebhook = async (req, res, next) => {
    try {
        const {
            customerId,
            customerName,
            customerEmail,
            customerAddress,
        } = req.body;

        // validating data received from webhook 
        if (!customerId || !customerName) {
            return res.status(400).json({
                success: false,
                error: 'Missing required webhook data'
            });
        }

        // Create welcome package
        const welcomePackage = new Package({
            customerId,
            customerName,
            packageType: 'Welcome Package',
            contents: [
                'Company Welcome Letter',
                'Product Catalog',
                'Discount Coupon',
                'Brand Merchandise'
            ],
            deliveryAddress: customerAddress,
            status: 'dispatch'
        });

        await welcomePackage.save();

        // Send welcome package email
        await sendWelcomePackageEmail(
            { name: customerName, email: customerEmail },
            welcomePackage
        );

        console.log("now sending response");
        res.status(201).json({
            success: true,
            message: 'Welcome package created successfully',
            package: welcomePackage
        });
    } catch (error) {
        next(error);
    }
}

// Get all packages
export const getPackages = async (req, res, next) => {
    try {
        const packages = await Package.find().sort({ createdAt: -1 });
        res.status(200).json(packages);
    } catch (error) {
        next(error);
    }
};