const app = require("./app")
const dotenv = require("dotenv")
const { connectDatabase } = require("./config/database")

// config

dotenv.config({ path: "backend/config/config.env" })
// Connect to DB
connectDatabase()

const port = process.env.PORT || 4000


app.listen(port, () => {
    console.log("Server is Running on port 4000");
})