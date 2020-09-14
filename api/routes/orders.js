const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/orders GET'
    })
})

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        productId: req.body.productId
    })
    order.save()
        .exec()
        .then((data) => {
            console.log(data)
            res.status(201).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    res.status(201).json({
        message: '/orders POST',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    res.status(200).json({
        message: `Id for get is ${id}`
    })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    res.status(200).json({
        message: `Id for delete is ${id}`
    })
})

module.exports = router