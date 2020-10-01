const db = require('../../database/dbConfig')


const getAllHouses = () => {
    return db("house_sell_request as h")
            .join("house_image as hi", "hi.house_id", "h.id")
            .join("image as i", "i.id", "hi.image_id")
            .select("h.*", "i.image_url")

}
    
const getHouseById = houseId => {
    return db("house_sell_request as h")
            .where('h.id',houseId)
}

const getHouseByOwnerId =  ownerId => {
    return db("user_sell_house as uh")
            .where({user_id: ownerId})
            .join("house_sell_request as hr", "hr.id", "uh.house_id")
            .join("house_image as hi", "hi.house_id", "uh.house_id")
            .join("image as i","i.id", "hi.image_id")
            .join("user as u", "u.id", "uh.user_id")
}

const addHouse = house => {
    return db("house_sell_request")
            .returning("id")
            .insert(house)
            .then(ids => ({id: ids[0]}))
}

const createHouseWithUser = userHouseIds => {
    return db("user_sell_house")
            .returning("id")
            .insert(userHouseIds)
            .then(ids => ({id: ids[0]}))
}

const updateHouse = (houseId, change) => {
    return db("house_sell_request as h")
            .where({id: houseId})
            .update(change)
}

const deleteHouse = houseId => {
    return db("house_sell_request")
            .where({id: houseId})
            .del()
}


module.exports = {
    getAllHouses,
    getHouseById,
    getHouseByOwnerId,
    addHouse,
    createHouseWithUser,
    updateHouse,
    deleteHouse
}

