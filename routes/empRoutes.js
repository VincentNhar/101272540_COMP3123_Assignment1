const express = require("express")
const EmpModel = require("../model/Employee")
const routes = express.Router()


// GET ALL EMPLOYEE LIST
// http://localhost:8080/api/v1/emp/employees
routes.get("/employees", async (req,res) => {

    try{
        const employeeList = await EmpModel.find({})
        res.status(200).send(employeeList)
    }catch(error){
        res.status(500).send(error)
    }
})

// CREATE NEW EMPLOYEE
// http://localhost:8080/api/v1/emp/employees
routes.post("/employees", async (req,res) => {


    try{
        const newEmp = new EmpModel({
            ...req.body
        })
        await newEmp.save()

        res.status(201).send({message: "New employee has been created"})
    }catch(error){
        if(error.code == 11000){
            res.status(400).send({message: `Employee with email '${req.body.email}' already exists`})
        }else if(error.name == "ValidationError"){
            res.status(400).send({message: `Gender must only be either Male, Female, Other`})
        }else{
            res.status(500).send(error)
        }
    }
})

// GET EMPLOYEE BY ID
// http://localhost:8080/api/v1/emp/employees/{id}
routes.get("/employees/:_id", async (req,res) => {

    try{
        const employee = await EmpModel.findById(req.params._id)

        res.status(200).send(employee)
    }catch(error){
        if(error.name == "CastError"){
            res.status(400).send({message: `Employee with ID ${req.params._id} doesn't exist`})
        }else{
            res.status(500).send(error)
        }
    }
})

// UPDATE EMPLOYEE BY ID
// http://localhost:8080/api/v1/emp/employees/{id}
routes.put("/employees/:_id", async (req,res) => {

    try{
        const employee = await EmpModel.findByIdAndUpdate(req.params._id,req.body)

        res.status(200).send({message: "Employee info has been updated"})
    }catch(error){
        if(error.code == 11000){
            res.status(500).send({message:`Employee with ID ${req.params._id} already exist`})
        }else if(error.name = "CastError"){
            res.status(400).send({message: `Employee with ID ${req.params._id} doesn't exist`})
        }else{
            res.status(500).send(error)
        }
    }
})

// DELETE EMPLOYEE BY ID
// http://localhost:8080/api/v1/emp/employees?id=xxx
routes.delete("/employees", async (req,res) => {

    try{
        const employee = await EmpModel.findByIdAndDelete(req.query._id)
        if(!employee){
            res.status(404).send({message: "Book not found"})
        }

        //no message because HTTP status 204 doesn't send a message back
        res.status(204).send()
    }catch(error){
        if(error.name = "CastError"){
            res.status(404).send({message: `Employee with ID ${req.params._id} doesn't exist`})
        }else{
            res.status(500).send(error)
        }
    }

})

module.exports = routes