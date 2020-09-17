const db = require('../../database/dbConfig')

const getAllRequests = () => {
    return db("node_buy_request as n")
            .join("user_buy_node as un", "un.node_request_id", "n.id")
            .join("user as u", "u.id", "un.user_id")
}
const getRequestById = requestId => {
    return db("node_buy_request as n")
            .where('n.id',requestId)
            .join("user_buy_node as un", "un.node_request_id", "n.id")
            .join("user as u", "u.id", "un.user_id")
}

const getRequestByUserId = userId => {
    return db("user_buy_node as un")
            .where({user_id: userId})
            .join("user as u", "u.id", "un.user_id")
            .join("node_buy_request as ur", "ur.id", "un.node_request_id")
            .join("house_sell_request as hr", "hr.id", "ur.house_id")
            .join("house_image as hi", "hi.house_id", "ur.house_id")
            .join("image as i", "i.id", "hi.image_id")
}

const addRequest = request => {
    return db("node_buy_request")
            .returning("id")
            .insert(request)
            .then(ids => ({id: ids[0]}))
}

const addRequestWithUser = userBuyIds => {
    return db("user_buy_node")
            .returning("id")
            .insert(userBuyIds)
            .then(ids => ({id: ids[0]}))
}

const deleteRequest = requestId => {
    return db("node_buy_request")
            .where({id: requestId})
            .del()
}

const updateRequest = (requestId, change) => {
    return db("node_buy_request")
            .where({id: requestId})
            .update(change)
            .then(request => request)
}

module.exports = {
    getAllRequests,
    getRequestById,
    getRequestByUserId,
    addRequest,
    addRequestWithUser,
    deleteRequest,
    updateRequest
}
