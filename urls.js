const express = require('express');
const shortid = require('shortid');

const router = express.Router();

const { urls } = require('./url_data');

router.get('/', (req, res) => {
    const urlList = [];
    Object.keys(urls).forEach((urlId) => {
        urlList.push({ id: urlId, longUrl: urls[urlId] });
    });
    res.status(200).send(urlList);
});

router.post('/', (req, res) => {
    const id = shortid.generate();
    urls[id] = req.body.longUrl;
    res.status(201).send({ id });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const longUrl = urls[req.params.id];
    if (longUrl) {
        res.status(200).send({ id, longUrl });
    } else {
        res.status(404).send('Invalid short url Id');
    }
});

module.exports = router;
