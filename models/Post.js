const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SkillSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    status: {
        type: String,
        enum: ['Wishlist', 'Learning', 'Finished']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('skills', SkillSchema)