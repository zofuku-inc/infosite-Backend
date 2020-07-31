const router = require('express').Router();
const bcrypt = require('bcryptjs');
const queries = require('./userQueries');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const isAdmin = require('../../middlewares/restricted-middleware');
require('dotenv').config()

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


//FORGOT PASSWORD
router.post('/forgotpassword', (req,res) => {
    if (req.body.email === ''){
        res.status(400).send('email required')
    }
    queries
        .users
        .findBy({email: req.body.email})
        .first()
        .then(user => {
            if (user === null){
                res.status(403).send('email not in db')
            } else {
                console.log('user', user)
                const token = crypto.randomBytes(20).toString('hex')
                // user.update({
                //     resetPasswordToken: token,
                //     resetPasswordExpires: Date.now()*3600000
                // });

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `${process.env.EMAIL_ADDRESS}`,
                        pass: `${process.env.EMAIL_PASSWORD}`
                    }
                });

                console.log('user.email', user.email)

                const mailOptions = {
                    from: 'htran2@babson.edu',
                    to: `${user.email}`,
                    subject: 'Link to Reset Password',
                    text: 
                        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                        + 'Please click on the following link, or paste this into your browser to complete the process within an hour of receiving it:\n\n'
                        + `http://localhost:3000/reset/${token}\n\n`
                        + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err){
                        console.error('there was an error:  ', err)
                    } else {
                        console.log('here is the res: ', response)
                        res.status(200).json('recovery email sent')
                    }
                })
            }
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