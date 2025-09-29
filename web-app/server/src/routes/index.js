const express = require('express');
const router = express.Router(); // Creates a new router instance
// Import other route modules
const acSettingsRoutes = require('./acSettings');
const lightSettingsRoutes = require('./lightSettings');

router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Mount sub-routes
router.use('/ac-settings', acSettingsRoutes);
router.use('/light-settings', lightSettingsRoutes);

module.exports = router;