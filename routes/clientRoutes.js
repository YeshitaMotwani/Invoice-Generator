const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/clients', clientController.createClient);
router.get('/clients/:clientId', clientController.getClient);
router.get('/clients', clientController.getAllClients);
router.put('/clients/:clientId', clientController.updateClient);
router.delete('/clients/:clientId', clientController.deleteClient);

module.exports = router;