import express from 'express';
import dotenv from 'dotenv';
import { connectionDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use(express.json());

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectionDB();
    console.log("Server is running on port 3000");
    console.log(`http://localhost:${PORT}`);
});