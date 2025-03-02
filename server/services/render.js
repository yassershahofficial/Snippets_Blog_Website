const axios = require('axios');

exports.homeRoutes = (req,res) => {
    res.render('index');
}
exports.addPostRoutes = (req,res) => {
    res.render('form');
}
exports.viewPostRoutes = (req,res) => {
    res.render('view');
}
exports.allDirectories = (req,res) => {
    res.render('all-directores');
}