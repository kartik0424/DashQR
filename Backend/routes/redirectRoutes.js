const express = require("express")
const {handleRedirect} = require("../controllers/redirectController")

const router = express.Router()

router.get("/q/:code", handleRedirect)

module.exports = router