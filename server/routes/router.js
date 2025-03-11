const express = require('express');
const route = express.Router();
const services = require('../services/render'); //for routing interface
const controller = require('../controller/controller'); //for rest api -->CRUD function
 
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
 * @description Update Post Route
 * @method PUT /update-post
 */
route.get('/update-post', services.updatePostRoutes)
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

//Create
route.post('/api/posts', controller.create);

//Find All or Sort All or by Id
route.get('/api/posts', controller.find)

//Update By Id
route.put('/api/post/:id', controller.update)

//Delete by Id
route.delete('/api/posts/:id', controller.delete)
    
module.exports = route;