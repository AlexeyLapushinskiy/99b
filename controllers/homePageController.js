const async = require('async');
const path = require('path');
const homePageController = {};

homePageController.homePage = function (req, res) {
  console.log("in homePageController");
  res.sendFile(path.resolve('src/main.html'));
};

module.exports = homePageController;