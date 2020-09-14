const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
        .select('_id name price')
        .exec()
        .then((data) => {
            const response = {
                count: data.length,
                products: data.map((res) => {
                    return {
                        name: res.name,
                        price: res.price,
                        _id: res._id,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/products/${res._id}`
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then((result) => {
            console.log(result)
            res.status(201).json({
                message: 'Product created successfully',
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
    Product.findById(id).exec()
        .then((data) => {
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
    updateParams = {}
    for (const params of req.body) {
        updateParams[params.paramName] = params.value
    }
    Product.update({
            _id: id
        }, {
            $set: updateParams
        })
        .exec()
        .then((data) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({
            _id: id
        })
        .exec()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router