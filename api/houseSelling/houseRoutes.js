const router = require('express').Router()
const housingModel = require('./houseQueries');
const isAdmin = require('../../middlewares/restricted-middleware')


//GET all approved house selling requests
router.get('/approved', async (req,res) => {
    try {
        const requests = await housingModel.getApprovedHouses()
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//GET all unapproved house selling requests
router.get('/unapproved', async (req,res) => {
    try {
        const requests = await housingModel.getUnapprovedHouses()
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a house selling request
router.post('/owner/:owner_id', (req,res) => {
    const houseToPost = req.body
    const owner_id = req.params.owner_id
    housingModel
        .addHouse(houseToPost)
        .then(response => {
            console.log('res1', response)
            const house_id = response.id
            housingModel.createHouseWithUser({
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
            res.status(500).json(err)
        })
})

//GET a house by owner id
router.get('/owner/:owner_id', async (req, res) => {
    const owner_id = req.params.owner_id
    try {
        const houses = await housingModel.getHouseByOwnerId(owner_id)
        res.status(200).json(houses)
    } catch (err){
        res.status(500).json(err)
    }
})

//GET a house by house id
router.get('/:house_id', async (req,res) => {
    const house_id = req.params.house_id
    try {
        const house = await housingModel.getHouseById(house_id)
        res.status(200).json(house)
    } catch (err){
        res.status(500).json(err)
    }
})

//GET a house selling request by id
router.get('/:houseId', async (req,res) => {
    const houseId = req.params.houseId
    try {
        const request = await housingModel.getHouseById(houseId)
        res.status(200).json(request)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE a house selling request
router.patch('/:houseId', isAdmin, async (req,res) => {
    const houseId = req.params.houseId
    const change = req.body
    try {
        await housingModel.updateHouse(houseId, change)
        res.status(200).json({message: 'updated 1 house selling request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE number of nodes of a house
router.patch('/:houseId/user', async (req, res) => {
    const houseId = req.params.houseId
    const change = req.body
    try {
        await housingModel.updateHouse(houseId, change)
        res.status(200).json({message: 'updated 1 house selling request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DELETE a house selling request
router.delete('/:houseId', async (req,res) => {
    const houseId = req.params.houseId
    try {
        await housingModel.deleteHouse(houseId)
        res.status(200).json({message: 'deleted 1 house selling request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router;