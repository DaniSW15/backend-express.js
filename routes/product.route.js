import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { deleteProductById, getProductById, getProducts, postProducts, putProductById } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", postProducts);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", putProductById);

router.delete("/:id", deleteProductById);

export default router;