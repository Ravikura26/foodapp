const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: {
        type: Object
    },
    total: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Done"]
    },
    deliveyStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending","Accepted", "Delivered","cancelled"]
    },
    isAccepted:{
        type:Boolean,
        default:false,

    },
    rejectionReason: {
        type: String,
        default: ""
    }

}, {timestamps: true});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
