const QrCodes = require("../models/QRCode.js")
const QRCode = require("../models/QRCode.js")
const generateShortCode = require("../utils/generateCode.js")

exports.createQR = async (req, res) => {
    try{
        const {originalUrl, design} = req.body

        if(!originalUrl) {
            return res.status(400).json({message:"URL is required"})
        }

        const shortCode = generateShortCode()

        const qr = await QrCodes.create({
            user: req.user._id,
            originalUrl,
            shortCode,
            design
        })

        res.status(201).json(qr)
    } catch (error) {
        res.status(500).json({message: "Qr creation failed" })
    }
}

exports.getUserQRs = async (req, res) => {
  try {
    const qrs = await QRCode.find({ user: req.user._id })
      .select("shortCode status totalScan originalUrl design")
      .sort({ createdAt: -1 })

    res.json(qrs) // ALWAYS array
  } catch (error) {
    console.error("getUserQRs error:", error)
    res.status(500).json({ message: "Failed to fetch QRs" })
  }
}


exports.pauseQR = async(req, res) => {
    try{
        const qr = await QRCode.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if(!qr) {
            return res.status(404).json({message: "Qr not found!"})
        }

        qr.status = "paused"
        await qr.save()

        res.json({message: "QR paused successfully."})

    } catch(error){
        // console.log(error);
        res.status(500).json({message: "Failed to pause QR"})
    }
}


exports.resumeQR = async (req, res) => {
    try{
        const qr = await QRCode.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if(!qr) {
            return res.status(404).json({message: "Qr not found"})
        }

        qr.status = "active"
        await qr.save()

        res.json({message: "Qr resumed Successfully"})
    } catch(error) {
        res.status(500).json({message: "failed to resume QR"})
    }
}


exports.deleteQR = async (req, res) => {
    try{
        const qr = await QRCode.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })

        if(!qr) {
            return res.status(404).json({message: "Qr not found"})
        }

        res.json({message: "QR delete Successfully"})
    } catch (error) {
        res.status(500).json({message: "failed to delete QR"})
    }
}
