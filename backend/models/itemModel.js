const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: String,
        required: true,
        trim: true

    },
    image: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
