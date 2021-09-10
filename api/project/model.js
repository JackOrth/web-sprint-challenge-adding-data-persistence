const db = require('./../../data/dbConfig')

function findAll() {
    return db('projects')
}

async function create(project){
    const [project_id] = await db('projects').insert(project)
    return db('projects').where({ project_id }).first()
}
module.exports = {
    findAll,
    create
}