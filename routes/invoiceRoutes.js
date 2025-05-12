const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Routes specific to a client
router.post('/clients/:clientId/invoices', invoiceController.createInvoice);
router.get('/clients/:clientId/invoices', invoiceController.getAllInvoicesByClient);

// General invoice routes (you might adjust these based on your needs)
router.get('/invoices/:invoiceId', invoiceController.getInvoice);
router.put('/invoices/:invoiceId', invoiceController.updateInvoice);
router.delete('/invoices/:invoiceId', invoiceController.deleteInvoice);
router.patch('/invoices/:invoiceId/paid', invoiceController.markInvoiceAsPaid);

module.exports = router;