const router = require('express').Router()
const { 
        getAllBuyingRequests, 
        addBuyingRequest, 
        getRequestByUserId,
        addUserBuyNode,
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
router.post('/fromBuyer/:buyer_id', async (req,res) => {
    const requestToPost = req.body
    const buyer_id = req.params.buyer_id
    addBuyingRequest(requestToPost)
        .then(response => {
            const request_id = response.id
            addUserBuyNode({
                user_id: buyer_id,
                node_request_id: request_id
                })
                .then(newres => {
                    res.status(200).json(newres)
                })
                .catch(err => {
                    res.status(200).json(err)
                })
        })
        .catch(err => {
            res.status(200).json(err)
        })
})

//GET buying request by id
router.get('/:requestId/get', async (req,res) => {
    const requestId = req.params.requestId
    try {
        const request = await getSpecificBuyingRequest(requestId)
        res.status(200).json(request)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//GET request by user id
router.get('/fromBuyer/:buyer_id', async (req,res) => {
    const buyer_id = req.params.buyer_id
    try {
        const requests = await getRequestByUserId(buyer_id)
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err)
    }
})


//DEL buying request by id
router.delete('/:requestId/delete', async (req,res) => {
    const requestId = req.params.requestId
    try {
        await delBuyingRequest(requestId)
        res.status(200).json({message: 'deleted 1 request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})


//UPDATE buying request by id
router.patch('/:requestId/edit', async (req,res) => {
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

