import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.get('/tokens', async (req, res) => {
    const { chainId } = req.query;

    if (!chainId) {
        return res.status(400).json({ error: 'Missing chainId query parameter' });
    }

    try {
        const response = await axios.get(`https://api.1inch.dev/swap/v6.0/${chainId}/tokens`, {
            headers: {
                Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching tokens from 1inch:', error);
        res.status(500).json({ error: 'Failed to fetch tokens from 1inch' });
    }
});

app.get('/swap', async (req, res) => {
    const { src, dst, amount, from, slippage, chainId } = req.query;

    if (!src || !dst || !amount || !from || !slippage || !chainId) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const response = await axios.get(`https://api.1inch.dev/swap/v6.0/${chainId}/swap`, {
            headers: {
                Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
            },
            params: {
                src: src as string,
                dst: dst as string,
                amount: amount as string,
                from: from as string,
                slippage: slippage as string,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching swap data from 1inch:', error);
        res.status(500).json({ error: 'Failed to fetch swap data from 1inch' });
    }
});

app.get('/quote', async (req, res) => {
    const { src, dst, amount, chainId } = req.query;

    if (!src || !dst || !amount || !chainId) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const response = await axios.get(`https://api.1inch.dev/swap/v6.0/${chainId}/quote`, {
            headers: {
                Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
            },
            params: {
                src: src as string,
                dst: dst as string,
                amount: amount as string,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching quote from 1inch:', error);
        res.status(500).json({ error: 'Failed to fetch quote from 1inch' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
}); 