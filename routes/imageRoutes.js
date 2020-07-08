const router = require('express').Router();
const cloudinary = require('cloudinary');
require('dotenv').config();
const {
    addImage,
    getImages,
    addHouseImage,
    getImagesByHouseId
} = require('../queries/imageQueries')

const cloud_name = process.env.CLOUD_NAME
const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET


cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})



//POST image url with house_id
router.post('/forHouse/:houseId',  (req, res) => {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    const houseId = req.params.houseId
    Promise
        .all(promises)
        .then(results => {
            console.log('results', results)
            for (let i=0; i<results.length; i++){
                const imageToPost = {
                    image_url:  results[i].secure_url,
                    width: results[i].width,
                    height: results[i].height,
                    created_at: results[i].created_at
                }
                addImage(imageToPost)
                .then(response => {
                    const imageId = response.id
                    console.log('imageId', imageId)
                    addHouseImage({
                        image_id: imageId,
                        house_id: houseId
                    })
                    .then(newres => {
                        res.status(200).json(results)
                    })
                    .catch(err => {
                        res.status(500).json(err.message)
                    })
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
            }
        })
        .catch(err => {
            res.json(err.message)
        })
})

//GET images
router.get('/', async (req,res) => {
    try {
        const images = await getImages()
        res.status(200).json(images)
    } catch (err){
        res.status(500).json(err)
    }
})

//POST house_image
// router.post('/house_image', async (req,res) => {
//     const houseImageIds = req.body
//     try {
//         const id = await addHouseImage(houseImageIds)
//         res.status(200).json(id)
//     } catch (err){
//         res.status(500).json(err)
//     }
// } )


//GET images by house_id
router.get('/forHouse/:house_id', async (req,res) => {
    const house_id = req.params.house_id
    try {
        const images = await getImagesByHouseId(house_id)
        res.status(200).json(images)
    } catch (err){
        res.status(500).json(err)
    }
})


module.exports = router;