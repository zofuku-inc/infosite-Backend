const db = require('../database/dbConfig')

function getAllBuyingRequests(){
    return db("node_buy_request as n")
            .join("users as u", "u.id", "n.buyer_id")
            
}

function getSpecificBuyingRequest(requestId){
    return db("node_buy_request as n")
            .where('n.id',requestId)
            .join("users as u", "u.id", "n.buyer_id")
}

function addBuyingRequest(request){
    return db("node_buy_request")
            .returning("id")
            .insert(request)
            .then(ids => ({id: ids[0]}))
}

function delBuyingRequest(requestId){
    return db("node_buy_request")
            .where({id: requestId})
            .del()
}

function editBuyingRequest(requestId, change){
    return db("node_buy_request")
            .where({id: requestId})
            .update(change)
            .then(request => request)

}


module.exports = {
    getAllBuyingRequests,
    getSpecificBuyingRequest,
    addBuyingRequest,
    delBuyingRequest,
    editBuyingRequest
}