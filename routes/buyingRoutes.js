const router = require('express').Router()
const { 
        getAllBuyingRequests, 
        addBuyingRequest, 
        delBuyingRequest,
        getSpecificBuyingRequest, 
        editBuyingRequest
    } = require('../queries/buyingQueries')

//GET all buying requests
router.get('/', async (req,res) => {
    try {
        const requests = await getAllBuyingRequests()
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a buying request
router.post('/', async (req,res) => {
    const requestToPost = req.body
    try {
        const id = await addBuyingRequest(requestToPost)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET buying request by id
router.get('/:requestId', async (req,res) => {
    const requestId = req.params.requestId
    try {
        const request = await getSpecificBuyingRequest(requestId)
        res.status(200).json(request)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DEL buying request by id
router.delete('/:requestId', async (req,res) => {
    const requestId = req.params.requestId
    try {
        await delBuyingRequest(requestId)
        res.status(200).json({message: 'deleted 1 request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})


//UPDATE buying request by id
router.patch('/:requestId', async (req,res) => {
    const requestId = req.params.requestId
    const change = req.body
    try {
        await editBuyingRequest(requestId, change)
        res.status(200).json({message: 'updated the request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router

