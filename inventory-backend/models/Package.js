import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    packageType: {
        type: String,
        required: true,
        default: 'Welcome Package'
    },
    contents: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['dispatch', 'shipped', 'delivered'],
        default: 'dispatch'
    },
    deliveryAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Package = mongoose.model('Package', packageSchema);

export default Package;