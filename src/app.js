const express = require('express')
require('./db/mongoose')
const categoryRouter = require('./routers/Category')
const subCategoryRouter = require('./routers/SubCategory')
const blogRouter = require('./routers/Blog')

const app = express()

app.use(express.json())

app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(blogRouter)

module.exports = app