const db = require('../database/dbConfig')

module.exports = {
    buyingRequests: {
        getAll: function(){
            return db("node_buy_request as n")
                    .join("user_buy_node as un", "un.node_request_id", "n.id")
                    .join("user as u", "u.id", "un.user_id")
        },
        getByRequestId: function(requestId){
            return db("node_buy_request as n")
                    .where('n.id',requestId)
                    .join("user_buy_node as un", "un.node_request_id", "n.id")
                    .join("user as u", "u.id", "un.user_id")
        },
        getByUserId: function(userId){
            return db("user_buy_node as un")
                    .where({user_id: userId})
                    .join("user as u", "u.id", "un.user_id")
                    .join("node_buy_request as ur", "ur.id", "un.node_request_id")
        },
        create: function(request){
            return db("node_buy_request")
                    .returning("id")
                    .insert(request)
                    .then(ids => ({id: ids[0]}))
        },
        createWithUser: function(userBuyIds){
            return db("user_buy_node")
                    .returning("id")
                    .insert(userBuyIds)
                    .then(ids => ({id: ids[0]}))
        },
        delete: function(requestId){
            return db("node_buy_request")
                    .where({id: requestId})
                    .del()
        },
        update: function(requestId, change){
            return db("node_buy_request")
                    .where({id: requestId})
                    .update(change)
                    .then(request => request)
        }

    }
}

