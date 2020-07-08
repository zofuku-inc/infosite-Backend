const router = require('express').Router();
const cloudinary = require('cloudinary');
const {
    addImage
} = require('../queries/imageQueries')

const cloud_name = `${process.env.CLOUD_NAME}`
const api_key = `${process.env.API_KEY}`
const api_secret = `${process.env.API_SECRET}`

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})



//POST image url
router.post('/',  (req, res) => {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    
    Promise
        .all(promises)
        .then(results => {
            console.log('results', results)
            for (let i=0; i<results.length; i++){
                addImageUrl(results[i])
                .then(id => {
                    res.status(200).json(id)
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


//GET images by house_id





module.exports = router;