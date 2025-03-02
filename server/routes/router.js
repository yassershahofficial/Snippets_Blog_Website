const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

/** 
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes)
/** 
 * @description Add Post Route
 * @method GET /add-post
 */
route.get('/add-post', services.addPostRoutes)

/** 
 * @description View Post Route
 * @method GET /view-post
 */
route.get('/view-post', services.viewPostRoutes)

/** 
 * @description All Directories Route
 * @method GET /all-directories
 */
route.get('/directories', services.allDirectories)
    
module.exports = route;