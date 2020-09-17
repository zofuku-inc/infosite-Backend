const db = require('../../database/dbConfig')


const getAllImages =  () => {
    return db("image")
}

const getImageByHouseId = houseId => {
    return db("house_image as hi")
            .where({house_id: houseId})
            .join("image as i", "i.id", "hi.image_id")
            .join("house_sell_request as h", "h.id", "hi.house_id")            
}

const addImage =  image => {
    return db("image")
            .returning('id')
            .insert(image)
            .then(ids => ({id: ids[0]}))
}

const addImageWithHouse = houseImageIds => {
    return db("house_image")
            .returning('id')
            .insert(houseImageIds)
            .then(ids => ({id: ids[0]}))
}

module.exports = {
    getAllImages,
    getImageByHouseId,
    addImage,
    addImageWithHouse
}




