const db = require('../database/dbConfig')

function getAllUsers(){
    return db("users")
}

function getUserById(userId){
    return db("users")
            .where({id: userId})
            .then(users => users[0])
}

function addUser(user){
    return db("users")
            .returning("id")
            .insert(user)
            .then(ids => ({id: ids[0]}))

}

function updateUser(userId, change){
    return db("users")
            .where({id: userId})
            .update(change)
}

function deleteUser(userId){
    return db("users")
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