const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {timestamps: true});

const catgeoryModel = mongoose.model('Catgeory', catSchema);

module.exports = catgeoryModel;
