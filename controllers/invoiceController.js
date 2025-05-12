const Invoice = require('../models/invoiceModel');

const invoiceController = {
    createInvoice: (req, res) => {
        const newInvoice = { ...req.body, client_id: req.params.clientId };
        Invoice.create(newInvoice, (err, invoice) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating invoice', error: err });
            }
            res.status(201).json({ message: 'Invoice created successfully', data: { invoice_id: invoice.insertId, ...newInvoice } });
        });
    },

    getInvoice: (req, res) => {
        const invoiceId = req.params.invoiceId;
        Invoice.findById(invoiceId, (err, invoice) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching invoice', error: err });
            }
            if (!invoice.length) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json({ data: invoice[0] });
        });
    },

    getAllInvoicesByClient: (req, res) => {
        const clientId = req.params.clientId;
        Invoice.findAllByClient(clientId, (err, invoices) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching invoices', error: err });
            }
            res.status(200).json({ data: invoices });
        });
    },

    updateInvoice: (req, res) => {
        const invoiceId = req.params.invoiceId;
        const updatedInvoice = req.body;
        Invoice.update(invoiceId, updatedInvoice, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating invoice', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            Invoice.findById(invoiceId, (err, invoice) => {
                if (err) {
                    return res.status(500).json({ message: 'Error fetching updated invoice', error: err });
                }
                res.status(200).json({ message: 'Invoice updated successfully', data: invoice[0] });
            });
        });
    },

    deleteInvoice: (req, res) => {
        const invoiceId = req.params.invoiceId;
        Invoice.delete(invoiceId, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting invoice', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json({ message: 'Invoice deleted successfully' });
        });
    },

    markInvoiceAsPaid: (req, res) => {
        const invoiceId = req.params.invoiceId;
        Invoice.markAsPaid(invoiceId, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating invoice status', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            Invoice.findById(invoiceId, (err, invoice) => {
                if (err) {
                    return res.status(500).json({ message: 'Error fetching updated invoice', error: err });
                }
                res.status(200).json({ message: 'Invoice marked as paid', data: invoice[0] });
            });
        });
    }
};

module.exports = invoiceController;