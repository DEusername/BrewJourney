import express from 'express'

import api from './api/index.js'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

app.use('/', api)

app.use('*splat', function (req, res, next) {
    res.status(404).send({
        error: `Requested resource ${req.originalUrl} does not exist`
    })
})

app.listen(port, function () {
    console.log("== Server is running on port", port)
})
