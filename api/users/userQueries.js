const db = require('../../database/dbConfig')
const jwt = require('jsonwebtoken')
const secrets = require('../../secret')

module.exports = {
    users: {
        getAll: function(){
            return db("user")
        },
        getById: function(userId){
            return db("user")
                    .where({id: userId})
                    .then(users => users[0])
        },
        create: function(user){
            return db("user")
                    .returning("id")
                    .insert(user)
                    .then(ids => ({id: ids[0]}))
        },
        findBy: function(filter){
            return db("user")
                    .where(filter)
        },
        update: function(userId, change){
            return db("user")
                    .where({id: userId})
                    .update(change)
        },
        delete: function(userId){
            return db("user")
                    .where({id: userId})
                    .del()
        }       
    },
    generateToken: function(user){
        const payload = {
            subject: user.id
        }
        const secret = secrets.jwtSecret;
        const options = {
            expiresIn: '8h'
        }
    
        return jwt.sign(payload, secret, options)
    }
}

