const express = require('express')
const Blog = require('../models/blogs')

const router = new express.Router();

router.post('/blog', (req, res) => {
    const blog = new Blog({
        ...req.body,
    })
    blog.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

router.get('/blog', async (req, res) => {
    try {
        const query = {}
        if (req.query.id) {
            query._id = req.query.id
        }
        if (req.query.parent_subcategory) {
            query.parent_subcategory = req.query.parent_subcategory
        }
        const result = await Blog.find(query)
        if (result.length) {
            res.status(200).send(result)
        } else {
            res.status(400).send("No Results found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.get('/tasks',(req,res)=>{
//     Task.find({}).then((tasks)=>{
//         res.status(200).send(tasks)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })    
// })

// router.get('/tasks/:id', auth, async (req, res) => {
//     try {
//         const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
//         // const task = await Task.findOne({_id:"5d20ecf253312f087078d8b2", owner:"5d20ec9753312f087078d8af"})
//         console.log('task', task)
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.status(200).send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.get('/tasks/:id',(req,res)=>{
//     const _id = req.params.id
//     // const _id = req.query.id
//     console.log(_id)
//     Task.findById(_id).then((task)=>{
//         res.status(200).send(task)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })    
// })


// router.patch('/tasks/:id', auth, async (req, res) => {
//     try {
//         const inputUpdates = Object.keys(req.body) // retruns object properties and methods as arry of stings
//         const validUpdates = ["description", "completed"]
//         // returns true if all inputUpdates are valid, returns false even one of them is not includes in validlist
//         const isValidUpdate = inputUpdates.every((inputUpdate) => {
//             return validUpdates.includes(inputUpdate)
//         })
//         if (!isValidUpdate) {
//             res.status(400).send({ error: 'Have some improper updates to update in Task' })
//         }
//         const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
//         if (!task) {
//             return res.status(404).send()
//         }
//         inputUpdates.every((inputUpdate) => {
//             task[inputUpdate] = req.body[inputUpdate]
//         })
//         await task.save()
//         res.status(200).send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.patch('/tasks/:id', async (req,res)=>{
//     try {
//         const inputUpdates = Object.keys(req.body) // retruns object properties and methods as arry of stings
//         const validUpdates = ["description","completed"]
//         // returns true if all inputUpdates are valid, returns false even one of them is not includes in validlist
//         const isValidUpdate = inputUpdates.every((inputUpdate)=>{
//                 return validUpdates.includes(inputUpdate)
//         })
//         if (!isValidUpdate) {
//             res.status(400).send({error:'Have some improper updates to update in Task'})
//         }
//         const _id = req.params.id
//         // By setting new to True , we are telling returns updated object not the old object before updated
//         // runValidators: true , runs validations on Object fields, i.e to cehck improper data
//         // const user =await  Task.findByIdAndUpdate(_id, req.body, {new:true,runValidators:true,useFindAndModify:false})
//         // findByIdAndUpdate is not supports middleware functionality so modified as below
//         const task = await Task.findById(_id)
//         inputUpdates.every((inputUpdate)=>{
//             task[inputUpdate] = req.body[inputUpdate]
//         })
//         await task.save()

//         res.status(200).send(task)
//     } catch(error) {
//         res.status(500).send(error)
//     }
// })


// router.delete('/tasks/:id', auth, async (req, res) => {
//     try {
//         // returns deleted Task
//         const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
//         res.status(200).send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.delete('/tasks/:id', async (req,res)=>{
//     try {
//         const _id = req.params.id
//         // returns deleted Task
//         const user =await  Task.findByIdAndDelete(_id)
//         res.status(200).send(user)
//     } catch(error) {
//         res.status(500).send(error)
//     }  
// })

module.exports = router


