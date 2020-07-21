const router = require('express').Router()
const queries = require('./houseQueries');


//GET all house selling requests
router.get('/houses', async (req,res) => {
    try {
        const requests = await queries.housingRequests.getAll()
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a house selling request
router.post('/owner/:owner_id', (req,res) => {
    const requestToPost = req.body
    const owner_id = req.params.owner_id
    queries
        .housingRequests
        .create(requestToPost)
        .then(response => {
            console.log('res1', response)
            const house_id = response.id
            queries
            .housingRequests
            .createWithUser({
                                user_id: owner_id,
                                house_id: house_id
                            })
                .then(newres => {
                    res.status(200).json({house_id: house_id})
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

//GET a house by owner id
router.get('/owner/:owner_id', async (req, res) => {
    const owner_id = req.params.owner_id
    try {
        const houses = await queries.housingRequests.getByOwnerId(owner_id)
        res.status(200).json(houses)
    } catch (err){
        res.status(500).json(err)
    }
})

//GET a house by house id
router.get('/getHouse/:house_id', async (req,res) => {
    const house_id = req.params.house_id
    try {
        const house = await queries.housingRequests.getById(house_id)
        res.status(200).json(house)
    } catch (err){
        res.status(500).json(err)
    }
})

//GET a house selling request by id
router.get('/:requestId/get', async (req,res) => {
    const requestId = req.params.requestId
    try {
        const request = await queries.housingRequests.getById(requestId)
        res.status(200).json(request)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE a house selling request
router.patch('/:requestId/edit', async (req,res) => {
    const requestId = req.params.requestId
    const change = req.body
    try {
        await queries.housingRequests.update(requestId, change)
        res.status(200).json({message: 'updated 1 house selling request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DELETE a house selling request
router.delete('/:requestId/delete', async (req,res) => {
    const requestId = req.params.requestId
    try {
        await queries.housingRequests.delete(requestId)
        res.status(200).json({message: 'deleted 1 house selling request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router