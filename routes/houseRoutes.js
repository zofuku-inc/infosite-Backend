const router = require('express').Router()
const {
        getAllHousingRequests,
        addHousingRequest,
        getHouseByOwnerId,
        addUserHouse,
        getHousingRequestById,
        updateHousingRequest,
        deleteHousingRequest
      } = require('../queries/houseQueries')


//GET all house selling requests
router.get('/', async (req,res) => {
    try {
        const requests = await getAllHousingRequests()
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a house selling request
router.post('/owner/:owner_id', (req,res) => {
    const requestToPost = req.body
    const owner_id = req.params.owner_id
    addHousingRequest(requestToPost)
        .then(response => {
            console.log('res1', response)
            const house_id = response.id
            addUserHouse({
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
        const houses = await getHouseByOwnerId(owner_id)
        res.status(200).json(houses)
    } catch (err){
        res.status(500).json(err)
    }
})

//GET a house selling request by id
router.get('/:requestId/get', async (req,res) => {
    const requestId = req.params.requestId
    try {
        const request = await getHousingRequestById(requestId)
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
        await updateHousingRequest(requestId, change)
        res.status(200).json({message: 'updated 1 house selling request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DELETE a house selling request
router.delete('/:requestId/delete', async (req,res) => {
    const requestId = req.params.requestId
    try {
        await deleteHousingRequest(requestId)
        res.status(200).json({message: 'deleted 1 house selling request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router