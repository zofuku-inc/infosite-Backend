const db = require('../database/dbConfig')


function getAllHousingRequests(){
    return db("house_sell_request as h")
            .join("user as u", "u.id", "h.owner_id")
}

function addHousingRequest(request){
    return db("house_sell_request")
            .returning("id")
            .insert(request)
            .then(ids => ({id: ids[0]}))
}

function getHousingRequestById(requestId){
    return db("house_sell_request as h")
            .where('h.id',requestId)
            .join("user as u", "u.id", "h.owner_id")
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
    getHousingRequestById,
    updateHousingRequest,
    deleteHousingRequest
}