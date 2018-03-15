const async = require('async');
const path = require('path');
const mainController = {};

mainController.mainPage = function (req, res) {
	res.sendFile(path.resolve('src/main.html'));
};

module.exports = mainController;
