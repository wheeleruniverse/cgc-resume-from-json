
const blob = require('@vercel/blob');
const crypto = require('crypto');
const express = require('express');

const router = express.Router();

router.put('/', async (req, res, next) => {
    if(!req.body){
        res.sendStatus(400);
        return;
    }
    const filename = `${crypto.randomUUID()}.json`;
    try {
        await blob.put(filename, JSON.stringify(req.body), {
            access: 'public',
            addRandomSuffix: false,
            contentType: 'application/json'
        });

    } catch(error) {
        return next(error);
    }
    res.send(filename);
});

module.exports = router;