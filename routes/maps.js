const express = require('express');
const router = express.Router();

//bring in Markers
let Marker = require('../models/marker');
// User Model
let User = require('../models/user');

// Main Route
router.get('/map', (req, res) => {
    Marker.find({}, (err, markers) => {
        res.locals.docsJSON = JSON.stringify([markers]);
        res.render('map', {
            title: 'Google Maps',
            markers: markers
        });
    });
});

// Main Route
router.get('/createMarker', (req, res) => {
    Marker.find({}, (err, markers) => {
        if (err){
            console.log(err);
        }else{
            res.locals.docsJSON = JSON.stringify([markers]);
            res.render('createMarker', {
                title: 'Add Marker',
                markers: markers
            });
        }
    });
});

// post CreateMarker page
router.post('/createMarker', (req, res) => {
    const locname = req.body.locname;
    const lat = req.body.lat;
    const long = req.body.long;
    
    req.checkBody('locname', 'Location Name is Required..').notEmpty();
    req.checkBody('lat', 'Latitude is Required.').notEmpty();
    req.checkBody('long', 'Longitude is Required.').notEmpty();
    // request.checkBody({ 
    //     'lat': {
    //       optional: {
    //         options: { checkFalsy: true }
    //       },
    //       isNumber: {
    //         errorMessage: 'The Latitude must be a number.'
    //       }
    //     }
    // });
    // request.checkBody({ 
    //     'long': {
    //       optional: {
    //         options: { checkFalsy: true }
    //       },
    //       isNumber: {
    //         errorMessage: 'The Longitude must be a number.'
    //       }
    //     }
    // });
    // req.checkBody('lat', 'Latitude is Required.').isNumber();
    // req.checkBody('long', 'Longitude is Required.').isNumber();
    
    let errors = req.validationErrors();

    if (errors){
        res.render('createMarker', {
            title: 'Add Marker',
            errors:errors
        });
    }else {
        // let newMarker = new Marker();
        // newMarker.lat = req.body.lat;
        // newMarker.long = req.body.long;
        // newMarker.creator = req.user._id;

        let newMarker = new Marker({
            locname: locname,
            lat: lat,
            long: long,
            creator: req.user._id
        });
        
        console.log(newMarker.lat);

        newMarker.save((err) => {
            if (err){
                console.log(err);
                return;
            }else{
                req.flash('success', 'Marker Created');
                res.redirect('/maps/map');
            }
        });
    }
    // res.render('createMarker', {
    //     title: 'Add Marker'
    // });
});

module.exports = router;