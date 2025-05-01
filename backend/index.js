const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const expenseRoute = require("./routes/expense")
dotenv.config()
const app = express();
// DB Connections

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.use("/expenses", expenseRoute);


mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('DB Connection is successfull')
}).catch((err) => {
    console.log(err)
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port${process.env.PORT}`)
})