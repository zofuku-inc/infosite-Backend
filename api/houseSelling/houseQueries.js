const db = require('../../database/dbConfig')


const getAllRequests = () => {
    return db("house_sell_request as h")
            .join("house_image as hi", "hi.house_id", "h.id")
            .join("image as i", "i.id", "hi.image_id")
            .select("h.*", "i.image_url")

}
    
const getRequestById = requestId => {
    return db("house_sell_request as h")
            .where('h.id',requestId)
}

const getRequestByOwnerId =  ownerId => {
    return db("user_sell_house as uh")
            .where({user_id: ownerId})
            .join("house_sell_request as hr", "hr.id", "uh.house_id")
            .join("house_image as hi", "hi.house_id", "uh.house_id")
            .join("image as i","i.id", "hi.image_id")
            .join("user as u", "u.id", "uh.user_id")
}

const addRequest = request => {
    return db("house_sell_request")
            .returning("id")
            .insert(request)
            .then(ids => ({id: ids[0]}))
}

const createRequestWithUser = userHouseIds => {
    return db("user_sell_house")
            .returning("id")
            .insert(userHouseIds)
            .then(ids => ({id: ids[0]}))
}

const updateRequest = (requestId, change) => {
    return db("house_sell_request as h")
            .where({id: requestId})
            .update(change)
}

const deleteRequest = requestId => {
    return db("house_sell_request")
            .where({id: requestId})
            .del()
}


module.exports = {
    getAllRequests,
    getRequestById,
    getRequestByOwnerId,
    addRequest,
    createRequestWithUser,
    updateRequest,
    deleteRequest
}

