const db = require('../database/dbConfig')

function getAllBuyingRequests(){
    return db("node_buy_request as n")
            .join("user_buy_node as un", "un.node_request_id", "n.id")
            .join("user as u", "u.id", "un.user_id")
            
}

function getSpecificBuyingRequest(requestId){
    return db("node_buy_request as n")
            .where('n.id',requestId)
            .join("user_buy_node as un", "un.node_request_id", "n.id")
            .join("user as u", "u.id", "un.user_id")
}

function addBuyingRequest(request){
    return db("node_buy_request")
            .returning("id")
            .insert(request)
            .then(ids => ({id: ids[0]}))
}

function addUserBuyNode(userBuyIds){
    return db("user_buy_node")
            .returning("id")
            .insert(userBuyIds)
            .then(ids => ({id: ids[0]}))
}

function getRequestByUserId(userId){
    return db("user_buy_node as un")
            .where({user_id: userId})
            .join("user as u", "u.id", "un.user_id")
            .join("node_buy_request as ur", "ur.id", "un.node_request_id")
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
    addUserBuyNode,
    getRequestByUserId,
    delBuyingRequest,
    editBuyingRequest
}