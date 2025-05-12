const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
const PORT = 3000; // You can choose a different port

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use the defined routes
app.use('/api', clientRoutes);
app.use('/api', invoiceRoutes);

app.get('/', (req, res) => {
    res.send('Invoice Generator Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});