import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const postProducts = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const putProductById = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}