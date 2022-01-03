// mongoosejs.com
const mongoose = require('mongoose')


const blogDataSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    blog_title: {
        type: String,
        required: true
    },
    seo_title: {
        type: String,
        required: true
    },
    seo_description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        contentType: String,
        data: String
    },
    blog: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)


const BlogData = new mongoose.model('BlogData', blogDataSchema)

module.exports = BlogData
