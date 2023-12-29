//import express from 'express'

const express = require('express')

const uuid = require('uuid')

import cors from 'cors'
//const cors = require('cors')

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const users = []

const checkUserId = (request, response, next) => {

    const { id } = request.params 

    const index = users.findIndex( user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "user not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {

    return response.json(users)

})


app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId , (request, response) => {
    

    const {name, age} = request.body
    const id = request.userId
    const index = request.userIndex

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)

})


app.delete('/users/:id', checkUserId , (request, response) => {

    const index = request.userIndex    
    users.splice(index, 1)

    return response.status(204).json()

})



app.listen(port, () => {
    console.log(`🚀 server started on port ${port}`)
})

/*const express = require("express")

const uuid = require('uuid')

const cors = require('cors')

const app = express()


import cors from 'cors'
const port = 3001
app.use(express.json())
app.use(cors())

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
})*/
