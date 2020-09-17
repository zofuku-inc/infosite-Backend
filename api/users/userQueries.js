const db = require('../../database/dbConfig')
const jwt = require('jsonwebtoken')
const secrets = require('../../secret')

const getAllUsers =  () => {
    return db("user")
}

const getUserById = userId => {
    return db("user")
            .where({id: userId})
            .then(users => users[0])
}

const addUser = user => {
    return db("user")
            .returning("id")
            .insert(user)
            .then(ids => ({id: ids[0]}))
}
        
const findUserBy = filter => {
    return db("user")
            .where(filter)
}

const updateUser = (userId, change) => {
    return db("user")
            .where({id: userId})
            .update(change)
}

const deleteUser = userId => {
    return db("user")
            .where({id: userId})
            .del()
}       
    
const generateToken = user => {
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
    findUserBy,
    updateUser,
    deleteUser,
    generateToken
}

