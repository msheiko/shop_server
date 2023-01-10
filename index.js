const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const _ = require('lodash');
const phones = require('./phones.json');
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = 3001
app.use(express.static('public'));
app.get('/products', (req, res) => {
    const page = req.query.page ?? 1;
    const per_page = req.query.per_page ?? 10;
    const items = _.chunk(phones, per_page);
    const data = {
        meta: {
            page: Number.parseInt(page),
            per_page: Number.parseInt(per_page),
            total: Math.ceil(phones.length / per_page),
        },
        data: {
            total: phones.length,
            items: items[page]
        }
    };
    return res.json(data);
})
app.listen(port, () => {
    console.log(`App on ${port}`)
})