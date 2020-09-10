const router = require('express').Router()
const queries = require('./buyingQueries');


//GET all buying requests
router.get('/', async (req,res) => {
    try {
        const requests = await queries.buyingRequests.getAll()
        res.status(200).json(requests)
    } catch (err){
        console.log(err.response)
        res.status(500).json(err.message)
    }
})

//POST a buying request
router.post('/fromBuyer/:buyer_id', async (req,res) => {
    const requestToPost = req.body
    const buyer_id = req.params.buyer_id
    queries
        .buyingRequests
        .create(requestToPost)
        .then(response => {
            const request_id = response.id
            queries
                .buyingRequests
                .createWithUser({
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
        const request = await queries.buyingRequests. getByRequestId(requestId)
        res.status(200).json(request)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//GET request by user id
router.get('/fromBuyer/:buyer_id', async (req,res) => {
    const buyer_id = req.params.buyer_id
    try {
        const requests = await queries.buyingRequests.getByUserId(buyer_id)
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err)
    }
})


//DEL buying request by id
router.delete('/:requestId/delete', async (req,res) => {
    const requestId = req.params.requestId
    try {
        await queries.buyingRequests.delete(requestId)
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
        await queries.buyingRequests.update(requestId, change)
        res.status(200).json({message: 'updated the request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router

