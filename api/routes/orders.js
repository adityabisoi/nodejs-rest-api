const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/orders GET'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: '/orders POST',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    req.status(200).json({
        message: `Id for get is ${id}`
    })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    req.status(200).json({
        message: `Id for delete is ${id}`
    })
})

module.exports = router