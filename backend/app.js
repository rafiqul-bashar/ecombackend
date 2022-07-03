const cookieParser = require("cookie-parser")
const express = require("express")

const app = express()
const errorMiddleware = require("./middleware/error")



app.use(express.json())
app.use(cookieParser())
// Import routes here

const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")

app.use("/api", productRoute)
app.use("/api", userRoute)
app.use("/api", orderRoute)

// Error Middleware
app.use(errorMiddleware)
module.exports = app