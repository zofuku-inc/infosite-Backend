const router = require('express').Router()
const { 
        getAllBuyingRequests, 
        addBuyingRequest, 
        delBuyingRequest, 
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



module.exports = router

