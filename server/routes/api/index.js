// Get the router
var apirouter = require('express').Router();
var xpathController = require('../../controllers/xpath.server.controller');

// Middleware for all this apirouters requests
apirouter.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

// Welcome message for a GET at http://localhost:8080/restapi
apirouter.get('/', function(req, res) {
    var rand = Math.random() * (9999999 - 9999) + 9999;
    res.writeHead(301,
        {Location: 'https://apiui.herokuapp.com?https://raw.githubusercontent.com/sim5runner/runner-v2/master/server/routes/api/docs/swagger.json&' + rand }
    );
    res.end();
});

/**
 * api for xpath functionality
 *
 * xpath are unique at application level, different applications can have xpath with same key
 * user is restricted to update / delete key of existing xpath
 * user is able to update value of xpath with notification on basis of taskid tags
 */

// add xpath: error on existing xpath key for app
apirouter.post('/xpaths', xpathController.addXpath);

// get all xpath
apirouter.get('/xpaths', xpathController.getXpaths);

// get xpath for app_type
apirouter.get('/xpaths/:app_type', xpathController.getApplicationXpaths);

// get xpath: by key + app_type
apirouter.get('/xpaths/:app_type/:xpath_key', xpathController.getApplicationXpathValue);

// update xpath: update xpath value + add task_id tag (no duplicates)
apirouter.put('/xpaths/:app_type/:xpath_key', xpathController.updateApplicationXpath);

module.exports = apirouter;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}