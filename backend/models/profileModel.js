const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fullName: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    openingTime: {
        type: String
    },
    VNO: {
        type: String
    },
    banner: {
        type: String,
        default:"https://picsum.photos/id/237/200/300"
    }

}, {timestamps: true});

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;
