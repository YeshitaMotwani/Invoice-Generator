const db = require('../config/database');

const Client = {
    create: (newClient, callback) => {
        db.query('INSERT INTO clients SET ?', newClient, callback);
    },
    findById: (clientId, callback) => {
        db.query('SELECT * FROM clients WHERE client_id = ?', clientId, callback);
    },
    findAll: (callback) => {
        db.query('SELECT * FROM clients', callback);
    },
    update: (clientId, updatedClient, callback) => {
        db.query('UPDATE clients SET ? WHERE client_id = ?', [updatedClient, clientId], callback);
    },
    delete: (clientId, callback) => {
        db.query('DELETE FROM clients WHERE client_id = ?', clientId, callback);
    }
};

module.exports = Client;