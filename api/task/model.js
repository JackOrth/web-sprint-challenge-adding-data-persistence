const db = require('../../data/dbConfig')

function findAll() {
    return db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select('task_id','task_description', 'task_notes', 'task_completed', 'project_name', 'project_description')
}
async function create(task){
    const [task_id] = await db('tasks').insert(task)
    return db('tasks').where({ task_id }).first()
}

module.exports= {
    findAll,
    create
}