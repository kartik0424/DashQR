const mongoose = require("mongoose")

const qrScanSchema = new mongoose.Schema({
    qr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QRCode",
        required: true 
    },
    ip: String,
    userAgent: String,
    scannedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("QRScan", qrScanSchema)