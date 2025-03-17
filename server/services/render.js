const axios = require('axios');
const { param } = require('../routes/router');
const { query } = require('express');

exports.homeRoutes = (req,res) => {
    res.render('index');
}
exports.addPostRoutes = (req,res) => {
    res.render('form');
}
exports.updatePostRoutes = (req,res) => {
    axios.get('http://localhost:3000/api/posts', {params : {id: req.query.id}})
        .then(function(response){
            res.render('update-form', {post: response.data})
        })
        .catch(err => {
            res.status(500).send({message : err.message || "request unavailable"})
        })
}
exports.viewPostRoutes = (req,res) => {
    axios.get('http://localhost:3000/api/posts', {params : {id : req.query.id}})
        .then(function(response){
            res.render('single-view', {post: response.data});
        })
        .catch(err => {
            res.status(500).send({message : err.message || "request unavailable"})
        })
}
exports.allDirectories = (req,res) => {
    axios.get('http://localhost:3000/api/posts', 
        {params : {
            category : req.query.category || null, 
            startDate : req.query.startDate || null, 
            endDate : req.query.endDate || null,
            sortBy : req.query.sortBy || null,
            order : req.query.order || null
        }})
            .then(function(response){
                res.render('all-directores', {posts: response.data});
            })
            .catch(err => {
                res.status(500).send({message : err.message || "request unavailable"})
            })   
}