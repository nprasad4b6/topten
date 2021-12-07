// mongoosejs.com
const mongoose = require('mongoose')


const subCategorySchema = mongoose.Schema({
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
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'CATEGORY'
    }
},
    {
        timestamps: true
    }
)


const SubCategory = new mongoose.model('SubCategory', subCategorySchema)

module.exports = SubCategory
