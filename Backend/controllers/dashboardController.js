const QRCode = require("../models/QRCode")
const QRScan = require("../models/QRScan")

exports.getDashboardStats = async(req, res) => {
    try {
        const userId = req.user._id

        const totalQRCodes = await QRCode.countDocuments({user: userId})
        const activeQRCodes = await QRCode.countDocuments({
            user: userId,
            status: "active"
        })

        const pausedQRCodes = totalQRCodes - activeQRCodes

        const scansAgg = await QRCode.aggregate([
            {$match: {user: userId}},
            {$group: {_id: null, totalScan: {$sum: "$totalScan"}}}
        ])

        const totalScan = scansAgg[0]?.totalScan || 0

        res.json({
            totalQRCodes,
            activeQRCodes,
            pausedQRCodes,
            totalScan
        })

    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Failed to load Dashboard stats."})
    }
}


//-------------recentScan--------------------
exports.getRecentScans = async(req, res) => {
    try {
        const userId = req.user._id
        const scans = await QRScan.find().populate({
            path: "qr",
            match: {user: userId},
            select: "shortCode originalUrl"
        })
        .sort({scannedAt: -1})
        .limit(10)

        const filteredScans = scans.filter(scan => scan.qr !== null)

        res.json(filteredScans)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "failed to load scan activity"})
    }
}