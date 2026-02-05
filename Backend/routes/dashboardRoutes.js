const express = require("express")
const protect = require("../middlewares/authMiddleware")

const {getDashboardStats, getRecentScans} = require("../controllers/dashboardController")

const router = express.Router()

router.get("/stats", protect, getDashboardStats)
router.get("/recent-scans", protect, getRecentScans)

module.exports = router