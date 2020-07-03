const router = require('express').Router();
const {
        getAllUsers,
        getUserById,
        addUser,
        updateUser,
        deleteUser
      } = require('../queries/userQueries');


//GET all users
router.get('/', async (req,res) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a user
router.post('/', async (req,res) => {
    const userToPost = req.body
    try {
        const id = await addUser(userToPost)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET a user by id
router.get('/:userId/get', async (req,res) => {
    const userId = req.params.userId
    try {
        const user = await getUserById(userId)
        res.status(200).json(user)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//UPDATE a user
router.patch('/:userId/edit', async (req,res) => {
    const userId = req.params.userId
    const change = req.body
    try {
        await updateUser(userId, change)
        res.status(200).json({message: 'updated 1 user'})
    } catch (err){
        res.status(500).json(err.message)
    }
})


//DELETE a user
router.delete('/:userId/delete', async (req,res) => {
    const userId = req.params.userId
    try {
        await deleteUser(userId)
        res.status(200).json({message: 'deleted 1 user'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router