const db = require('../../database/dbConfig')

module.exports = {
    images: {
        getAll: function(){
            return db("image")
        },
        getbyHouseId: function(houseId){
            return db("house_image as hi")
                    .where({house_id: houseId})
                    .join("image as i", "i.id", "hi.image_id")
                    .join("house_sell_request as h", "h.id", "hi.house_id")            
        },
        create: function(image){
            return db("image")
                    .returning('id')
                    .insert(image)
                    .then(ids => ({id: ids[0]}))
        },
        createWithHouse: function(houseImageIds){
            return db("house_image")
                    .returning('id')
                    .insert(houseImageIds)
                    .then(ids => ({id: ids[0]}))
        }

    }
}


