const postDB = require('../model/model');
var postsDB = require('../model/model');

exports.create = async(req, res) => {
    try{
        if(!req.body){
            return res.status(400).send({message : "Content cannot be empty!" });
        }
    
        //new post
        const post = new postsDB({
            title: req.body.title,
            paragraphs: req.body.paragraphs,
            category: req.body.category,
            createdAt: Date.now(),
        });
    
        //save the user in the database
        await post
            .save(post)
            .then(data =>{
                // res.send(data)
                return res.redirect('/directories')
            })

    }catch(err){
        return res.status(500).send({message: err.message || "Some error has occured while creating a posts"})
    };
}

exports.find = async(req,res) => {
    try{
        let filter = {}
        let sorter = {}

        if(req.query.id){
            const id = req.query.id;
            await postsDB.findById(id)
                .then(post => {
                    if(!post){
                        return res.status(404).send({message : "User Not Found with Id : " + id})
                    }
                    else{
                        return res.send(post)
                    }
                })
        }
        else{
            //filter by category, if non, by default filter null
            if(req.query.category){
                filter.category = req.query.category;
            }
            // Filter by date range (startDate & endDate)
            if (req.query.startDate || req.query.endDate) {
                filter.createdAt = {}; // Initialize createdAt filter

                if (req.query.startDate) {
                    filter.createdAt.$gte = new Date(req.query.startDate); // Greater than or equal to startDate
                }
                if (req.query.endDate) {
                    filter.createdAt.$lte = new Date(req.query.endDate); // Less than or equal to endDate
                }
            }

            //sort by any type, if non, sort by latest createdAt
            if(req.query.sortBy){
                sorter[req.query.sortBy] = req.query.order === "asc" ? 1 : -1;
            }
            else{
                sorter = {createdAt : -1};
            }

            await postDB.find(filter).sort(sorter)
                .then(posts =>{
                    if(!posts.length){
                        return res.status(404).send({Message : "No Post Available with the Criteria(s) " + JSON.stringify(filter)})
                    }
                    else{
                        return res.send(posts)
                        // return res.redirect('/directories')
                    }
                })
        }
    }catch(err){
        return res.status(500).send({message : err.message || "Error has occured while retrieving posts"});
    }
}

exports.update = async(req,res) => {
    try{
        const id = req.params.id;
        await postDB.findByIdAndUpdate(id, req.body)
            .then(post => {
                if(!post){
                    return res.status(400).send({message : "Cannot Update Post Id : " + id + ". Id not Found"})
                }
                else{
                    return res.status(200).send({message : "Post Updated Successfully!"})
                }
            })
    }catch(err){
        return res.status(500).send({message : err.message || "Error has occured while updating the post"})
    }
}

exports.delete = async(req,res) => {
    try{
        const id = req.params.id;
        await postsDB.findByIdAndDelete(id)
            .then(post => {
                if(!post){
                    res.status(404).send({message : "id : " + id + " post is not available to delete"})
                }
                else{
                    res.status(200).send({message : "id : " + id + " post deleted successfully"})
                }
            })
    }catch(err){
        return res.status(500).send({message : err.message || " Error has occured while deleting a post"})
    }
}

