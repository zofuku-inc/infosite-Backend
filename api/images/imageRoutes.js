const router = require('express').Router();
const cloudinary = require('cloudinary');
require('dotenv').config();
const queries = require('./imageQueries')

const cloud_name = process.env.CLOUD_NAME
const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET

console.log('cloud_name', cloud_name)

cloudinary.config({
    cloud_name: `${cloud_name}`,
    api_key: `${api_key}`,
    api_secret: `${api_secret}`
})



//POST image url with house_id
router.post('/forHouse/:houseId',  (req, res) => {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    const houseId = parseInt(req.params.houseId)
    Promise
        .all(promises)
        .then(results => {
            if (results.length === 0){
                const imageToPost = {
                    image_url: "https://res.cloudinary.com/zofuku/image/upload/v1595627524/house_default_zg7uwu.jpg",
                    width: 400,
                    height: 300,
                    created_at: ""
                }
                queries
                    .images
                    .create(imageToPost)
                    .then(response => {
                        console.log('response in uploading image', response)
                        const imageId = response.id
                        queries
                            .images
                            .createWithHouse({
                                                image_id: imageId,
                                                house_id: houseId
                                            })
                            .then(newres => {
                                console.log('posted image and house successfully')
                                res.status(200).json(results)
                            })
                            .catch(err => {
                                console.log(err.message)
                                res.status(500).json(err.message)
                            })
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.status(500).json(err.message)
                    })
            }
            else {
                for (let i=0; i<results.length; i++){
                    const imageToPost = {
                        image_url:  results[i].secure_url,
                        width: results[i].width,
                        height: results[i].height,
                        created_at: results[i].created_at
                    }
                    queries
                        .images
                        .create(imageToPost)
                        .then(response => {
                            console.log('response in uploading image', response)
                            const imageId = response.id
                            console.log('imageId', imageId)
                            queries
                                .images
                                .createWithHouse({
                                                    image_id: imageId,
                                                    house_id: houseId
                                                })
                                .then(newres => {
                                    console.log('posted image and house successfully')
                                    res.status(200).json(results)
                                })
                                .catch(err => {
                                    console.log(err.message)
                                    res.status(500).json(err.message)
                                })
                        })
                        .catch(err => {
                            res.status(500).json(err.message)
                        })
                }
            }
        })
        .catch(err => {
            res.json(err.message)
        })
})

//GET images
router.get('/', async (req,res) => {
    try {
        const images = await queries.images.getAll()
        res.status(200).json(images)
    } catch (err){
        res.status(500).json(err)
    }
})


//GET images by house_id
router.get('/forHouse/:house_id', async (req,res) => {
    const house_id = req.params.house_id
    try {
        const images = await queries.images.getByHouseId(house_id)
        res.status(200).json(images)
    } catch (err){
        res.status(500).json(err)
    }
})


module.exports = router;