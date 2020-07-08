const db = require('../database/dbConfig')

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

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}