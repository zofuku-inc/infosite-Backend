const db = require('../database/dbConfig')

function addImageUrl(url){
    return db("image")
            .returning('id')
            .insert(url)
            .then(ids => ({id: ids[0]}))
}


module.exports = {
    addImageUrl
}