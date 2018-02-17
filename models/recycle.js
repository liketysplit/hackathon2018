const mongoose = require('mongoose');

// Recycle Schema
const RecycleSchema = mongoose.Schema({
    locname: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    qnty:{
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
const Recycle = module.exports = mongoose.model('Recycle', RecycleSchema);