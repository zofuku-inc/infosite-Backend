const router = require('express').Router()
const {
        getAllHousingRequests,
        addHousingRequest,
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
router.post('/', async (req,res) => {
    const requestToPost = req.body
    try {
        const id = await addHousingRequest(requestToPost)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
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