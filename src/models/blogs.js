// mongoosejs.com
const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    priority: {
        type: Number,
    },
    parent_subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SUBCATEGORY'
    }
},
    {
        timestamps: true
    }
)


const Blog = new mongoose.model('Blog', blogSchema)

module.exports = Blog
