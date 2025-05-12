const db = require('../config/database');

const Invoice = {
    create: (newInvoice, callback) => {
        db.query('INSERT INTO invoices SET ?', newInvoice, callback);
    },
    findById: (invoiceId, callback) => {
        db.query('SELECT * FROM invoices WHERE invoice_id = ?', invoiceId, callback);
    },
    findAllByClient: (clientId, callback) => {
        db.query('SELECT * FROM invoices WHERE client_id = ?', clientId, callback);
    },
    update: (invoiceId, updatedInvoice, callback) => {
        db.query('UPDATE invoices SET ? WHERE invoice_id = ?', [updatedInvoice, invoiceId], callback);
    },
    delete: (invoiceId, callback) => {
        db.query('DELETE FROM invoices WHERE invoice_id = ?', invoiceId, callback);
    },
    markAsPaid: (invoiceId, callback) => {
        db.query('UPDATE invoices SET status = "paid" WHERE invoice_id = ?', invoiceId, callback);
    }
};

module.exports = Invoice;