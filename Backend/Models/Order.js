import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        orderItems: [
            {
                name: String,
                qty: Number,
                image: String,
                price: Number,
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
            },
        ],

        shippingAddress: {
            address: String,
            city: String,
            postalCode: String,
            country: String,
        },

        paymentMethod: {
            type: String,
            default: "COD",
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            default: "Placed",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);