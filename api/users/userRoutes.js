const router = require('express').Router();
const bcrypt = require('bcryptjs');
const queries = require('./userQueries');
const isAdmin = require('../../middlewares/restricted-middleware')


//GET all users
router.get('/', isAdmin, async (req,res) => {
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
    queries
        .users
        .create(userToPost)
        .then(response => {
            if (response){
                queries
                    .users
                    .getById(response.id)
                    .then(newres => {
                        res.status(200).json(newres)
                    })
                    .catch(err => {
                        res.status(500).json(err.message)
                    })
            }
        })
        .catch(err => {
        res.status(500).json(err.message)
        })
})

//POST a user - sign in
router.post('/signin', (req,res) => {
    let {email, password} = req.body;
    queries
        .users
        .findBy({email})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                console.log('req.sessionID', req.sessionID)
                res.status(200).json({
                    message: `Welcome ${user.first_name}`,
                    id: user.id,
                    admin: user.admin,
                    sessionID: req.sessionID,
                    cookie: req.session.cookie
                })
            }
            else if (user=== undefined){
                res.status(401).json({message: 'Account does not exist'})
            }
            else {
                res.status(401).json({message: 'Password is invalid'})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

//LOGOUT
router.get('/signout', (req,res) => {
    if (req.session){
        req.session.destroy(err => {
            if (err){
                res.json({message: 'you can check out any time but you can never leave'})
            } else {
                res.status(200).json({message: 'bye, thanks for coming here'})
            }
        })
    }
    else {
        res.status(200).json({message: 'you were never here to begin with' })
    }
})

//GET a user by id
router.get('/:userId/get', async (req,res) => {
    const userId = req.params.userId
    try {
        const user = await queries.users.getById(userId)
        res.status(200).json(user)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//UPDATE a user
router.patch('/:userId/edit', isAdmin, async (req,res) => {
    const userId = req.params.userId
    const change = req.body
    try {
        await queries.users.update(userId, change)
        res.status(200).json({message: 'updated 1 user'})
    } catch (err){
        res.status(500).json(err.message)
    }
})


//DELETE a user
router.delete('/:userId/delete', isAdmin, async (req,res) => {
    const userId = req.params.userId
    try {
        await queries.users.delete(userId)
        res.status(200).json({message: 'deleted 1 user'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router