const mongoose = require("mongoose")

const qrcodeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        originalUrl: {
            type: String,
            required: true
        },
        shortCode: {
            type: String,
            required: true,
            unique: true
        },
        design: {
            type: Object,
            default: {}
        },
        status: {
            type: String,
            enum: ["active", "paused"],
            default: "active"
        },
        totalScan: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("QRCode", qrcodeSchema)