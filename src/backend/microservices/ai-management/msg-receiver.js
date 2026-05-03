import express from "express";

import api from './api/index.js'

const app = express()
const port = process.env.PORT || 4001

app.use(express.json());

app.use('/', api)

app.use('*splat', function (req, res, next) {
    res.status(404).send({
        error: `Requested resource ${req.originalUrl} does not exist`
    })
})

app.listen(port, () => {
    console.log("AI Manager running on port 4001");
});