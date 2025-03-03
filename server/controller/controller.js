const postDB = require('../model/model');
var postsDB = require('../model/model');

exports.create = (req, res) => {
    try{
        if(!req.body){
            res.status(400).send({message : "Content cannot be empty!" });
            return;
        }
    
        //new post
        const post = new postsDB({
            title: req.body.title,
            paragraphs: req.body.paragraphs,
            category: req.body.category,
            createdAt: Date.now(),
        });
    
        //save the user in the database
        post
            .save(post)
            .then(data =>{
                res.send(data)
                //res.redirect('/')
            })

    }catch(err){
        res.status(500).send({message: err.message || "Some error has occured while creating a posts"})
    };
}

exports.find = (req,res) => {
    try{
        if(req.query.id){
            const id = req.query.id;
            postsDB.findById(id)
                .then(post => {
                    if(!post){
                        res.status(404).send({message : "User Not Found with Id : " + id})
                    }
                    else{
                        res.send(post);
                    }
                })
        }
        else{
            postsDB.find() 
                .then(posts => {
                    res.send(posts)
                })
        }
    }catch(err){
        err.status(500).send({message : err.message || "Error has occured while retrieving posts"});
    }
    
}

exports.delete = (req,res) => {
    try{
        const id = req.params.id;
        postsDB.findByIdAndDelete(id)
            .then(post => {
                if(!post){
                    res.status(404).send({message : "id : " + id + " post is not available to delete"})
                }
                else{
                    res.status(200).send({message : "id : " + id + "post deleted successfully"})
                }
            })
    }catch(err){
        err.status(500).send({message : err.message || "Error has occured while deleting a post"})
    }
}