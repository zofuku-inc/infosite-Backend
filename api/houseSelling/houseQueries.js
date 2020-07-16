const db = require('../../database/dbConfig')

module.exports = {
    housingRequests: {
        getAll: function(){
            return db("house_sell_request as h")
        },
        getById: function(requestId){
            return db("house_sell_request as h")
                    .where('h.id',requestId)
        },
        getByOwnerId: function(ownerId){
            return db("user_sell_house as uh")
                    .where({user_id: ownerId})
                    .join("house_sell_request as hr", "hr.id", "uh.house_id")
                    .join("user as u", "u.id", "uh.user_id")
        },
        create: function(request){
            return db("house_sell_request")
                    .returning("id")
                    .insert(request)
                    .then(ids => ({id: ids[0]}))
        },
        createWithUser: function(userHouseIds){
            return db("user_sell_house")
                    .returning("id")
                    .insert(userHouseIds)
                    .then(ids => ({id: ids[0]}))
        },
        update: function(requestId, change){
            return db("house_sell_request as h")
                    .where({id: requestId})
                    .update(change)
        },
        delete: function(requestId){
            return db("house_sell_request")
                    .where({id: requestId})
                    .del()
        }

    }
}


