let express = require('express');
let router = express.Router();
let homePageController = require('../controllers/homePageController');

console.log('in homePageRoutes');

router.post('/homepage', homePageController.homePage);

module.exports = router;