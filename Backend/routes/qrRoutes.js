const express = require("express")
const {
  createQR,
  getUserQRs,
  pauseQR,
  resumeQR,
  deleteQR
} = require("../controllers/qrController")

const protect = require("../middlewares/authMiddleware.js")

const router = express.Router()

router.post("/", protect, createQR)
router.get("/", protect, getUserQRs)
router.patch("/:id/pause", protect, pauseQR)
router.patch("/:id/resume", protect, resumeQR)
router.delete("/:id", protect, deleteQR)

module.exports = router  