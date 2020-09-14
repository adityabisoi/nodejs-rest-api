const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/products GET'
    })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then((result) => {
            console.log(result)
            res.status(201).json({
                message: '/products POST',
                createdProduct: product
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id).exec().then((data) => {
        if (data) {
            console.log(data)
            res.status(200).json(data)
        } else {
            res.status(400).json({
                message: 'No valid item found'
            })
        }

    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            error: err
        })
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