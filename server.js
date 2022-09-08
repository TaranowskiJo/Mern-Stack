const { faker } = require('@faker-js/faker');

//our custom backend API server 

const express = require("express"); //import express into a vaiable
const app = express(); //initialize express app into a variable
//if you run in terminal: node server.js
//you should see this output
const port = 8000;
// also running ls in terminal should show server file!


// to access POST data,need to be able to pull it out of the request object
// make sure these lines are above any app.get or app.post code blocks
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
//express.urlencoded() and express.json() are Express middleware functions. 
//Responsible for providing and parsing the request.body data.



class Company {
    constructor() {
        this._id = faker.database.mongodbObjectId(),
        this.name = faker.company.name()
        this.address={
            streetNumber : faker.address.buildingNumber(),
            street : faker.address.street(),
            city : faker.address.city(),
            state : faker.address.state() ,
            zipCode : faker.address.zipCode(),
            country : faker.address.country()
        }
    }
}

class User {
    constructor() {
        this._id = faker.database.mongodbObjectId(),
        this.firstName = faker.name.firstName(),
        this.lastName = faker.name.lastName() ,
        this.phoneNumber = faker.phone.number(),
        this.password = faker.internet.password()
        this.email = faker.internet.email() 
    }
}

/***************GET BASE ROUTES**********************/
//route to get user
app.get("/api/user",(req,res)=>{

    res.json(
        new User()

    )
})

//same thing for company
app.get("/api/company",(req,res)=>{


    res.json(
        new Company() //calls comapny constructor
    )
})

/***************POST ROUTES**********************/
app.post("/api/user/new", (req, res) =>{
    console.log(req.body);
    User.push(req.body);
    console.log(User)

    res.json({
        count: User.length,
        results: User
    })
})

app.post("/api/company/new", (req, res) =>{
    console.log(req.body);
    Company.push(req.body);
    console.log(Company)

    res.json({
        count: Company.length,
        results: Company
    })
})



//MUST BE LAST LAST  LAST LINE BELOW AnYTHING ELSE
app.listen( port, () => console.log(`Listening on port: ${port}`) );
//takes port num into a callback function
