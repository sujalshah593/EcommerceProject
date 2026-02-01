import Order from "../Models/Order.js";
import orderEmailTemplate from "../utils/orderEmailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";


export const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            totalPrice,
        } = req.body;

        if(!orderItems || orderItems.length === 0) {
            return res.status(400).json({message: "No order items"});
        }

        const order = new Order({
            user: req.user._id,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            totalPrice: req.body.totalPrice,
            paymentMethod : req.body.paymentMethod || "COD",
            isPaid: true,
            paidAt: Date.now(),
        });

        const createdOrder = await order.save();

        await sendEmail({
            to: req.user.email,
            subject: "Order Confirmation - Shreeji Store",
            html: orderEmailTemplate({
                user: req.user,
                order: createdOrder,
            }),
        });
        res.status(201).json(createOrder);
    } catch(error){
        res.status(500).json({message: "Order creation failed"});
    }
};

export const getAllOrders = async (req, res) => {
    try { 
        const orders = await Order.find()
        .populate("user", "name email")
        .sort({createdAt: -1});
        res.json(orders);
    } catch(error){
        res.status(500).json({message: "Failed to fetch orders"});
    }
};