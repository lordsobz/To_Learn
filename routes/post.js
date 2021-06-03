const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Post = require('../models/Post')

router.get('/', verifyToken, async(req, res) =>{
    try{
        const posts = await Post.find({user: req.userId }).populate('user', ['username'])//Ham populate lay gia tri cua username de them vao muc user
        res.json({ success: true, posts})
    }catch(error){
        console.log(error)
		res.status(500).json({ success: false, message: 'Server error found' })
    }
})

router.post('/', verifyToken, async (req, res) =>{
    const { title, description, url, status} = req.body

    if(!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required'})
    try{
        const newPost = new Post({
            title,
            description: description || '',
            url: url.startsWith('https://') ? url:'https://'+(url) || '',
            status: status || 'Wishlist',
            user: req.userId
        })
        
        await newPost.save()

        res.json({ success: true, message: "Happy learning", post: newPost })
    }catch(error){
        console.log(error)
		res.status(500).json({ success: false, message: 'Server error found' })
    }
})


router.put('/:id', verifyToken, async(req, res) =>{
    const { title, description, url, status } = req.body

    if(!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required'})
    try{
        let updatedPost = {
            title, 
            description: description || '', 
            url: url.startsWith('http://') ? url:'http://'+(url) || '', 
            status: status || 'Wishlist'
        }
        
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true })

        //Neu khong co user va id 
        if(!updatedPost)
            return res
                .status(401)
                .json({success: false, message: "User not authorized" })

        res.json({success: true, message: 'Updated', post: updatedPost })

    }catch(error){
        console.log(error)
		res.status(500).json({ success: false, message: 'Server error found' })
    }

})

router.delete("/:id", verifyToken, async(req, res) =>{
    try{
        const postDeleteCondition = { _id: req.params.id, user: req.userId}
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

        if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorized'
			})
        res.json({success: true, post: deletedPost})
    }catch(error){
        console.log(error)
		res.status(500).json({ success: false, message: 'Server error found' })
    }
})

module.exports = router
