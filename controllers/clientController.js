const Client = require('../models/clientModel');

const clientController = {
    createClient: (req, res) => {
        const newClient = req.body;
        Client.create(newClient, (err, client) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating client', error: err });
            }
            res.status(201).json({ message: 'Client created successfully', data: { client_id: client.insertId, ...newClient } });
        });
    },

    getClient: (req, res) => {
        const clientId = req.params.clientId;
        Client.findById(clientId, (err, client) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching client', error: err });
            }
            if (!client.length) {
                return res.status(404).json({ message: 'Client not found' });
            }
            res.status(200).json({ data: client[0] });
        });
    },

    getAllClients: (req, res) => {
        Client.findAll((err, clients) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching clients', error: err });
            }
            res.status(200).json({ data: clients });
        });
    },

    updateClient: (req, res) => {
        const clientId = req.params.clientId;
        const updatedClient = req.body;
        Client.update(clientId, updatedClient, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating client', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Client not found' });
            }
            Client.findById(clientId, (err, client) => {
                if (err) {
                    return res.status(500).json({ message: 'Error fetching updated client', error: err });
                }
                res.status(200).json({ message: 'Client updated successfully', data: client[0] });
            });
        });
    },

    deleteClient: (req, res) => {
        const clientId = req.params.clientId;
        Client.delete(clientId, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting client', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Client not found' });
            }
            res.status(200).json({ message: 'Client deleted successfully' });
        });
    }
};

module.exports = clientController;