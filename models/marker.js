const mongoose = require('mongoose');

// Marker Schema
const MarkerSchema = mongoose.Schema({
    locname: {
        type: String,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    long:{
        type: Number,
        required: true
    },
    creator:{
        type: String,
        required: true
    }
});

// const User = mongoose.model('User', UserSchema);
// module.exports = User;
const User = module.exports = mongoose.model('Map', MarkerSchema);