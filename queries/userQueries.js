const db = require('../database/dbConfig')
const jwt = require('jsonwebtoken')
const secrets = require('../secret')

function getAllUsers(){
    return db("user")
}

function getUserById(userId){
    return db("user")
            .where({id: userId})
            .then(users => users[0])
}

function addUser(user){
    return db("user")
            .returning("id")
            .insert(user)
            .then(ids => ({id: ids[0]}))

}

function findBy(filter){
    return db("user")
            .where(filter)
}

function updateUser(userId, change){
    return db("user")
            .where({id: userId})
            .update(change)
}

function deleteUser(userId){
    return db("user")
            .where({id: userId})
            .del()
}

function generateToken(user){
    const payload = {
        subject: user.id
    }
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    findBy,
    updateUser,
    deleteUser,
    generateToken
}