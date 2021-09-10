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

router.post('/', (req,res,next) => {
    Projects.create(req.body)
        .then(project => {
            res.status(201).json(project)
        })  
        .catch(next)
});

module.exports = router


