const express = require('express');
const router = express.Router();

//bring in Markers
let Marker = require('../models/marker');

// Main Route
router.get('/map', (req, res) => {
    res.render('map', {
        title: 'Google Maps'
    });
});

// Main Route
router.get('/createMarker', (req, res) => {
    res.render('createMarker', {
        title: 'Add Marker'
    });
});

//get CreateMarker page
router.post('/createMarker', (req, res) => {
    const lat = req.body.lat;
    const long = req.body.long;
    
    req.checkBody('lat', 'Latitude is Required.').notEmpty();
    req.checkBody('long', 'Longitude is Required.').notEmpty();
    req.checkBody('lat', 'Latitude is Required.').isNumber();
    req.checkBody('long', 'Longitude is Required.').isNumber();
    
    let errors = req.validationErrors();

    if (errors){
        res.render('createMarker', {
            errors:errors
        });
    }else {
        let newMarker = new Marker({
            lat: lat,
            long: long,
            creatorId: creatorId
        });
        console.log(newMarker.lat);
    }
    res.render('createMarker', {
        title: 'Add Marker'
    });
});

module.exports = router;