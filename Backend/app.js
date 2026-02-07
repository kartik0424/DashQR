const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const qrRoutes = require("./routes/qrRoutes")
const authRoutes = require("./routes/authRoutes")
const redirectRoutes = require("./routes/redirectRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")




dotenv.config()

const app = express()

app.use(cors({
  origin: "*"
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", redirectRoutes)


app.use("/api/auth", authRoutes)
app.use("/api/qr", qrRoutes)

app.use("/api/dashboard", dashboardRoutes)


app.get("/", (req, res) => {
    res.send("DashQr API is running")
})

module.exports = app
