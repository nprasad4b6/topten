const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    priority: {
        type: Number,
    }
}, {
        timestamps: true
    })

const Category = new mongoose.model('Category', categoriesSchema)
module.exports = Category