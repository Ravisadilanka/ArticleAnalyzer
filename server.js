const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/analyze', async (req, res) => {
    try {
        const { url } = req.body;
        const response = await axios.post('http://localhost:5001/analyze', { url });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
