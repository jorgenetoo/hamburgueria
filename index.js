const express = require('express')
const app = express()
const port = 3000
const uuid = require('uuid')
app.use(express.json())

const orders = []

const checkMethodandUrl = (request, response, next) => {
    const method = request.method
    const url = request.url

    console.log(`${method} & ${url}`)
    next()
}

const CheckOrderId = (request, response, next) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "Order Not Found" })
    }

    request.orderIndex = index
    request.orderId = id

    next()
}


app.get('/orders', (request, response) => {
    return response.json(orders)
})


app.post('/orders', (request, response) => {
    const { order, clientName, price, status } = request.body

    const createOrder = { id: uuid.v4(), order, clientName, price, status: 'em preparação' }

    orders.push(createOrder)

    return response.status(201).json(createOrder)

})

app.put('/orders/:id', CheckOrderId, checkMethodandUrl, (request, response) => {
    const { order, clientName, price } = request.body
    const index = request.orderIndex
    const { id } = request.params

    const UpdateOrder = { id, order, clientName, price, status: 'em preparação' }

    orders[index] = UpdateOrder

    return response.status(201).json(UpdateOrder)

})

app.delete('/orders/:id', CheckOrderId, checkMethodandUrl, (request, response) => {
    const { id } = request.params
    const index = request.orderIndex
    orders.splice(index, 1)

    return response.status(204).json(orders)
})

app.get('/orders/:id', (request, response) => {

    const { id } = request.params
    const index = request.orderIndex
    const specificOrder = orders[index]

    return response.status(200).json(specificOrder)
})

app.patch('/orders/:id', (request, response) => {

    const { order, clientName, price } = request.body
    const index = request.orderIndex
    const { id } = request.params

    const UpdateOrder = { id, order, clientName, price, status: 'pronto, saindo para entrega' }

    orders[index] = UpdateOrder

    return response.status(201).json(UpdateOrder)
})

app.listen(port, () => {
    console.log(`🚀Server Started on Port ${port}🚀`)
})
