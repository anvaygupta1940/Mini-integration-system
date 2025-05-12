import axios from 'axios';

const notifyInventory = async (req, res, next) => {
    try {
        const customer = req.customer;
        const webhookUrl = process.env.INVENTORY_WEBHOOK;

        if (!webhookUrl) {
            console.error('Webhook URL not configured');
            return;
        }

        await axios.post(webhookUrl, {
            customerId: customer._id,
            customerName: customer.name,
            customerEmail: customer.email,
            customerAddress: customer.address || 'No address provided',
            // timestamp: new Date().toISOString()
        });

        res.status(200).json({ message: "Customer saved and Goodies send successfully." });

    } catch (error) {
        console.error("Webhook failed:", error.message);
        res.status(500).json({ message: "Customer saved, but webhook failed." });
    }
}


export default notifyInventory;