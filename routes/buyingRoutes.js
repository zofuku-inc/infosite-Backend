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
        console.log('requests', requests)
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router

