const db = require('../database/dbConfig')

function addImage(image){
    return db("image")
            .returning('id')
            .insert(image)
            .then(ids => ({id: ids[0]}))
}

function getImages(){
    return db("image")
}

function addHouseImage(houseImageIds){
    return db("house_image")
            .returning('id')
            .insert(houseImageIds)
            .then(ids => ({id: ids[0]}))
}

function getImagesByHouseId(houseId){
    return db("house_image as hi")
            .where({house_id: houseId})
            .join("image as i", "i.id", "hi.image_id")
            .join("house_sell_request as h", "h.id", "hi.house_id")            
}


module.exports = {
    addImage,
    getImages,
    addHouseImage,
    getImagesByHouseId
}