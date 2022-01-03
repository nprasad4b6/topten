const express = require('express')
require('./db/mongoose')
const categoryRouter = require('./routers/Category')
const subCategoryRouter = require('./routers/SubCategory')
const blogRouter = require('./routers/Blog')
const BlogData = require('./models/blogsData')
const cors = require('cors')
const app = express()
const path = require('path');
const fs = require('fs')

app.use(express.json())
app.use(cors())

app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(blogRouter)

const uploaddPath = path.join(__dirname, '/uploads')

const viewPath = path.join(__dirname, '/views')

// Set EJS as templating engine 
app.set("view engine", "ejs");

app.set('views', viewPath)

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploaddPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

app.get('/', (req, res) => {
    // res.send("Hello! Continue Your work..")
    res.sendFile(path.join(__dirname + `/../home.html`));
})
app.get('/getData/:name', (req, res) => {
    // res.render('play.html')
    res.sendFile(path.join(__dirname + `/../${req.params.name}.html`));
})

app.get('/getData', async (req, res) => {
    const id = req.query.id;
    const result = await BlogData.findById({ _id: id })
    // if (result.length) {
    //     res.status(200).send(result)
    // } else {
    //     res.status(400).send("No Results found")
    // }

    const data = {
        slug: result.slug,
        blog_title: result.blog_title,
        seo_title: result.seo_title,
        seo_description: result.seo_description,
        category: result.category,
        author: result.author,
        blog: result.blog,
        Imagedata: result.image.data
    }

    res.render('sample', data);
    // res.render('play.html')
    // res.sendFile(path.join(__dirname + `/../${req.params.name}.html`));
})
app.post('/postData', upload.single('image'), (req, res) => {
    const imagePath = uploaddPath + "\\" + req.file.filename;
    const Imagedata = fs.readFileSync(imagePath).toString('base64');
    const htmlFile = `<html>
    <head>
    <title>${req.body.blog_title}</title>
    <meta name="description" content=${req.body.seo_description}>
    <meta name="title" content=${req.body.seo_title}>
   </head>
    <body>
    <h2>${req.body.blog_title}</h2>
    <img src="data:image/jpg;base64, ${Imagedata}">
    <p>${req.body.author} | <a href="https://google.com"> ${req.body.category}</a></p>
     ${req.body.blog}
    </body>
    </html>`;

    const htmlHome = `
    <div id='${req.body.category}_${req.body.slug}'>
    <div>Articles</div>
    <h3>${req.body.blog_title}</h3>
    <div>
    ${req.body.blog_title}
    </div>
    </div>
    `
    fs.appendFileSync(__dirname + "/../home.html", htmlHome)
    fs.appendFileSync(__dirname + "/../" + req.body.slug + ".html", htmlFile)


    var obj = {
        slug: req.body.slug,
        blog_title: req.body.blog_title,
        seo_title: req.body.seo_title,
        seo_description: req.body.seo_description,
        category: req.body.category,
        author: req.body.author,
        blog: req.body.blog,
        image: {
            data: Imagedata,
            contentType: 'image/png'
        }
    }
    const blogData = new BlogData(obj)
    blogData.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
        res.status(500).send({ "error": error.message })
    })
})

module.exports = app