const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/products GET'
    })
})

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: '/products POST',
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    req.status(200).json({
        message: `Id for get is ${id}`
    })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    req.status(200).json({
        message: `Id for patch is ${id}`
    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    req.status(200).json({
        message: `Id for delete is ${id}`
    })
})

module.exports = router