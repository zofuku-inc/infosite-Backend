const db = require('../database/dbConfig')


function getAllHousingRequests(){
    return db("house_sell_request as h")
}

function addHousingRequest(request){
    return db("house_sell_request")
            .returning("id")
            .insert(request)
            .then(ids => ({id: ids[0]}))
}

function addUserHouse(userHouseIds){
    return db("user_sell_house")
            .returning("id")
            .insert(userHouseIds)
            .then(ids => ({id: ids[0]}))
}

function getHousingRequestById(requestId){
    return db("house_sell_request as h")
            .where('h.id',requestId)
            
} 

function getHouseByOwnerId(ownerId){
    return db("user_sell_house as uh")
            .where({user_id: ownerId})
            .join("house_sell_request as hr", "hr.id", "uh.house_id")
            .join("user as u", "u.id", "uh.user_id")
}

function updateHousingRequest(requestId, change){
    return db("house_sell_request as h")
            .where({id: requestId})
            .update(change)
}

function deleteHousingRequest(requestId){
    return db("house_sell_request")
            .where({id: requestId})
            .del()
}

module.exports = {
    getAllHousingRequests,
    addHousingRequest,
    addUserHouse,
    getHouseByOwnerId,
    getHousingRequestById,
    updateHousingRequest,
    deleteHousingRequest
}