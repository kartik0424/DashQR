const QRScan = require("../models/QRScan")
const QRCode = require("../models/QRCode")

exports.handleRedirect = async(req, res) => {
    try{
        const { code } = req.params

        const qr = await QRCode.findOne({shortCode: code})

        if(!qr){
            return res.status(404).send("Qr not found")
        }

        if(qr.status !== "active") {
            return res.status(403).send("Qr is Paused")
        }

        await QRScan.create({
            qr: qr._id,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })

        qr.totalScan += 1
        await qr.save()

        return res.redirect(qr.originalUrl)
    } catch(error){
        console.error(error)
        res.status(500).send("Redirect Failed")
    }
}

