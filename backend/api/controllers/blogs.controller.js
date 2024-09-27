
const dbClient = require("../config/db");
const { collections } = require("../constant/collections");
const { generateAccessToken, generateRefreshToken, validateToken } = require("../lib/token");
const { ObjectId } = require("mongodb");


module.exports.addBlog = async (req, res) => {
    try {

        const db = await dbClient.getClient();
        const userInfo = req.userInfo;
        const payload = req.body;

        payload['email'] = userInfo.email;
        payload['createdTime'] = (new Date()).getTime();
        payload['updatedTime'] = (new Date()).getTime();

        await db.collection(collections.BLOGS).insertOne(payload);

        return res.status(200).send({ success: true })
    }
    catch (error) {
        return res.status(400).send({ message: error.message })
    }
}

module.exports.addComment = async (req, res) => {
    try {

        const db = await dbClient.getClient();
        const userInfo = req.userInfo;
        const payload = req.body;
        console.log(payload)
        payload['email'] = userInfo.email;
        payload['createdTime'] = (new Date()).getTime();
        payload['updatedTime'] = (new Date()).getTime();
        payload.blogId = new ObjectId(payload.blogId)

        await db.collection(collections.COMMENTS).insertOne(payload);

        return res.status(200).send({ success: true })
    }
    catch (error) {
        return res.status(400).send({ message: error.message })
    }
}



module.exports.getBlogs = async (req, res) => {
    try {

        const db = await dbClient.getClient();
        const { page = 1, limit = 10 } = req.query;
        const userInfo = req.userInfo;

        const skip = (page - 1) * limit;
        // const blogs = await db.collection(collections.BLOGS).find().sort({_id:-1}).toArray();
        const blogs = await db.collection(collections.BLOGS).aggregate([
            {
                $lookup: {
                    from: 'comments',  // The comments collection
                    localField: '_id',  // Field in blogs collection (blogs._id)
                    foreignField: 'blogId',  // Field in comments collection (comments.blogId)
                    as: 'comments'  // The field to add comments into the blog document
                }
            }
        ]).toArray();
        

    

        return res.status(200).send({ success: true ,blogs})
    }
    catch (error) {
        return res.status(400).send({ message: error.message })
    }
}


module.exports.deleteBlog = async (req, res) => {
    try {

        const db = await dbClient.getClient();

        const userInfo = req.userInfo;
        const query = req.query;
        if (!query._id) {
            return res.send({ success: false, text: "query property not found" })
        }

        await db.collection(collections.BLOGS).deleteOne({ _id: new ObjectId(query._id) });

        return res.status(200).send({ success: true })
    }
    catch (error) {
        return res.status(400).send({ message: error.message })
    }
}


module.exports.editBlog = async (req, res) => {
    try {

        const db = await dbClient.getClient();
        const userInfo = req.userInfo;
        const query = req.query;
        if (!query._id) {
            return res.send({ success: false, text: "query property not found" })
        }
        const payload = req.body;
        payload['updatedTime'] = (new Date()).getTime();

        await db.collection(collections.BLOGS).findOneAndUpdate({ _id: new ObjectId(query._id) },
            {
                $set: payload

            });


        return res.status(200).send({ success: true })


    }
    catch (error) {
        return res.status(400).send({ message: error.message })
    }
}