const router = require('express').Router();
const bcrypt = require('bcryptjs');
const queries = require('../queries/userQueries');


//GET all users
router.get('/', async (req,res) => {
    try {
        const users = await queries.users.getAll()
        res.status(200).json(users)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a user - sign up
router.post('/', async (req,res) => {
    const userToPost = req.body
    if (userToPost.password){
        const pwhashed = bcrypt.hashSync(userToPost.password, 10)
        userToPost.password = pwhashed
    }
    try {
        const id = await queries.users.create(userToPost)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a user - sign in
router.post('/signin', (req,res) => {
    let {email, password} = req.body;
    findBy({email})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user)
                res.status(200).json({
                    message: `Welcome ${user.first_name}`,
                    id: user.id,
                    token
                })
            }
            else {
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
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