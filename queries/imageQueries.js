const db = require('../database/dbConfig')

function addImage(image){
    return db("image")
            .returning('id')
            .insert(image)
            .then(ids => ({id: ids[0]}))
}


module.exports = {
    addImage
}