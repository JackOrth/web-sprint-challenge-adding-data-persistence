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

router.post('/', async (req,res,next) => {
    try{
        if(req.body.task_name){
            const postedTask = await Tasks.create(req.body)
            res.status(201).json({
                ...postedTask,
                project_completed: Boolean(postedTask.task_completed)
            })
        }else{
            next()
        }
    }catch{
        next()
    }
});

module.exports = router