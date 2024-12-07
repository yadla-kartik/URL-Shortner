const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({msg: 'Url is required'})

    const shortId = shortid();
    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    res.render('home', {
        id: shortId
    })
}

module.exports = {
    handleGenerateShortUrl
}