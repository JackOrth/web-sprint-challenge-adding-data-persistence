const express = require('express')
const Projects = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const projects = await Projects.findAll()
        const displayProjects = projects.map((project) => {
            return{
                ...project,
                project_completed: Boolean(project.project_completed)
            }
        })
        res.status(200).json(displayProjects)
    }catch{
        next()
    }
})

router.post('/', async (req,res,next) => {
    try{
        if(req.body.project_name){
            const postedProject = await Projects.create(req.body)
            res.status(201).json({
                ...postedProject,
                project_completed: Boolean(postedProject.project_completed)
            })
        }else{
            next()
        }
    }catch{
        next()
    }
});

module.exports = router


