const express = require("express")
const userRoutes = require("./routes/userRoutes")
const empRoutes = require("./routes/empRoutes")
const mongoose = require("mongoose")

const app = express()
const apiv1 = express()

const SERVER_PORT = 8080

app.use(express.json())
app.use(express.urlencoded())

//DATABASE
const DB_CONNECTION_STRING = "mongodb+srv://dbrootadmin:dbpassword@cluster0.o0ag19w.mongodb.net/comp3123_assignment-1?retryWrites=true&w=majority"

mongoose.connect(DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true  
})

apiv1.use("/user", userRoutes)
apiv1.use("/emp", empRoutes)

app.use("/api/v1",apiv1)

app.route("/")
    .get((req, res) => {
        res.send("<h1>COMP3123 - Assignment 1</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})