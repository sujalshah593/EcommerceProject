import Product from "../Models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.targetGroup) {
      filter.targetGroup = {
        $eq: req.query.targetGroup,
      };
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .select("name price image rating targetGroup")
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      page,
      pages: Math.ceil(totalProducts / limit),
      total: totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) {
      res.status(404).json({ message: "Product not found"});
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({message: "Failed to fetch Product"});
  }
};