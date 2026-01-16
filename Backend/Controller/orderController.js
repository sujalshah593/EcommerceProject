import Order from "../Models/Order.js";

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
            orderItems,
            shippingAddress,
            totalPrice,
            paymentMethod : "COD",
        });

        const createdOrder = await order.save();
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