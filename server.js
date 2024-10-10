import express from 'express';
import dotenv from 'dotenv';
import { connectionDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(3000, () => {
    connectionDB();
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
});