const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order')

router.get('/', (req, res, next) => {
    Order.find()
        .exec()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        productId: req.body.productId
    })
    order.save()
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
    const orderId = req.params.orderId
    Order.findById(orderId).exec()
        .then((data) => {
            res.status(200).json({
                order: order
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    res.status(200).json({
        message: `Id for delete is ${id}`
    })
})

module.exports = router