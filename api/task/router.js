const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', async (req, res, next)=> {
    try{
        const tasks = await Tasks.findAll()
        const displayTasks = tasks.map((task)=>{
        return{
            ...task,
            task_completed: Boolean(task.task_completed)
        }
    })
    res.status(200).json(displayTasks)
    }catch{
        next()
    }
})

router.post('/', (req,res,next) => {
    Tasks.create(req.body)
        .then(task => {
            res.status(201).json(task)
        })  
        .catch(next)
});

module.exports = router