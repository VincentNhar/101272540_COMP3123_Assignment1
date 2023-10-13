const express = require("express")
const UserModel = require("../model/User")
const routes = express.Router()


// Allow user to create new account
// http://localhost:8080/api/v1/user/signup
routes.post("/signup", async (req,res) => {

    try{
        const newUser = new UserModel({
            ...req.body
        })

        await newUser.save()

        res.status(201).send(newUser)

    }catch(error){
        res.status(500).send(error)
    }

})

// Allows user to log in
// http://localhost:8080/api/v1/user/login?username=test1&password=test1
routes.post("/login", async (req,res) => {

    try{
        const { username,password } = req.query

        if(!username || !password){
            res.status(401).json({
                status: false,
                message: "Username and password are required"
            })
            return
        }
        
        const user = await UserModel.findOne({username})

        if(username == user.username && password == user.password){
            res.status(200).json({
                status: true,
                username: username,
                password: password,
                message: "User logged in successfully"
            })
        }else{
            res.status(401).json({
                status: false,
                message: "invalid username and password"
            })
        }
    }catch(error){
        res.status(500).send(error)
    }
  
})

module.exports = routes