<<<<<<< HEAD
﻿var express = require("express");
var app = new express();
var bodyParser = require("body-parser");
var _ = require("underscore");
var db = require("./db.js");
var middlewareAuth = require("./middleware.js")(db);

app.use(bodyParser.json()); //body-parser extract the entire body portion and exposes it on req.body 


//sync database with the model ( stored model into db )
db.sequelize.sync({force: true}).then(function () {

    console.log("Database started");
})


app.get("/", function (req, res) {

    res.send("Hello!! Welcome into my application");

});


// search an existing person with id
app.get("/findPerson/:id",middlewareAuth, function (req, res) {

    var id = parseInt(req.params.id, 10);

    //search by id
    db.model.find({
        where: {
            id: id
        }
    }).then(function (data) {
        if (!data) {
            res.status(404).send("This person is not exist");
        } else {
            console.log("Person matched");
            res.send(data.toJSON());
        }
    });
});

// search an existing person with query into URL Request
app.get("/findPerson",middlewareAuth, function (req, res) {

    var query = req.query;
    var queryAttrs = {};

    if (query.name) {   // if i insert "name" after ? character
        queryAttrs.name = query.name;   // add property name into queryAttrs object and will be equals at query.name
    }

    if (query.description) {
        queryAttrs.description = {
            $like: "%" + query.description + "%"
        }
    }
    if (query.person == "true") {
        queryAttrs.person = true;
    } else if (query.person == "false") {
        queryAttrs.person = false;
    }

    db.model.findAll({
        where: queryAttrs
    }).then(function (data) {

        if (data) {
            res.send(data);
        } else {
            res.status(404).send("This person is not exist");
        }
    })
})

// insert new person into sequelize database
app.post("/insertPerson",middlewareAuth, function (req, res) {

    var data = req.body;

    db.model.create({
        name: data.name,
        description: data.description,
        person: data.person
    }).then(function (todos) {
        res.send(todos.toJSON());
        console.log(todos.toJSON());
    })
});

// delete existing person into sequelize database
app.delete("/deletePerson/:id",middlewareAuth, function (req, res) {

    var id = parseInt(req.params.id, 10);

    db.model.destroy({ //delete with destroy istruction of sequelize
        where: {
            id: id  // delete id that is equal to id that i passed into URL request
        }
    }).then(function (data) {
        console.log("Person deleted");
        res.sendStatus(200).send(data);
    });
});

//insert a new account into database
app.post("/users", function (req, res) {

    var body = _.pick(req.body, "email" , "password");


    db.users.create({
            email: body.email,
            password: body.password
    }).then(function (data) {
        if (data) {
            res.status(200).send(_.pick(data.toJSON(), "email", "createdAt", "updatedAt"));
        }
    }, function (e) {
        res.send(e);
    })

});

// API for login with an existing account
app.post("/users/login", function (req, res) {

    var body = _.pick(req.body, "email", "password");   //filter body request for send into authenticate method only email and password
    var userInstance;

    db.users.authenticate(body).then(function (user) {
        userInstance = user;
        var token = user.generateToken("authentication");   // generate a token for use authorization from the user into other request

        return db.token.create({    //insert the token hashed into table ( column tokenHash )
            tokenHash: token
        });

        
    }).then(function(tokenInstance){

        console.log("You are logged");
        //built a response inserting tokenHash from the table into header responde and send the user record
        res.header("Auth", tokenInstance.get("tokenHash")).send(_.pick(userInstance, "email"))

    }, function (e) {
        res.status(401).send("Incorrect username or password. Please try again");
    })

});

//for delete form the token table, the token that user pass into header request
app.delete("/users/login",middlewareAuth, function (req, res) {
    
    req.token.destroy().then(function () {

        res.status(200).send("You've signed out! See you again soon!");
    }, function (e) {
        res.status(404).send();
    })
})

=======
﻿var express = require("express");
var app = new express();
var bodyParser = require("body-parser");
var _ = require("underscore");
var db = require("./db.js");
var middlewareAuth = require("./middleware.js")(db);

app.use(bodyParser.json()); //body-parser extract the entire body portion and exposes it on req.body 


//sync database with the model ( stored model into db )
db.sequelize.sync({force: true}).then(function () {

    console.log("Database started");
})


app.get("/", function (req, res) {

    res.send("Hello!! Welcome into my application");

});


// search an existing person with id
app.get("/findPerson/:id",middlewareAuth, function (req, res) {

    var id = parseInt(req.params.id, 10);

    //search by id
    db.model.find({
        where: {
            id: id
        }
    }).then(function (data) {
        if (!data) {
            res.status(404).send("This person is not exist");
        } else {
            console.log("Person matched");
            res.send(data.toJSON());
        }
    });
});

// search an existing person with query into URL Request
app.get("/findPerson",middlewareAuth, function (req, res) {

    var query = req.query;
    var queryAttrs = {};

    if (query.name) {   // if i insert "name" after ? character
        queryAttrs.name = query.name;   // add property name into queryAttrs object and will be equals at query.name
    }

    if (query.description) {
        queryAttrs.description = {
            $like: "%" + query.description + "%"
        }
    }
    if (query.person == "true") {
        queryAttrs.person = true;
    } else if (query.person == "false") {
        queryAttrs.person = false;
    }

    db.model.findAll({
        where: queryAttrs
    }).then(function (data) {

        if (data) {
            res.send(data);
        } else {
            res.status(404).send("This person is not exist");
        }
    })
})

// insert new person into sequelize database
app.post("/insertPerson",middlewareAuth, function (req, res) {

    var data = req.body;

    db.model.create({
        name: data.name,
        description: data.description,
        person: data.person
    }).then(function (todos) {
        res.send(todos.toJSON());
        console.log(todos.toJSON());
    })
});

// delete existing person into sequelize database
app.delete("/deletePerson/:id",middlewareAuth, function (req, res) {

    var id = parseInt(req.params.id, 10);

    db.model.destroy({ //delete with destroy istruction of sequelize
        where: {
            id: id  // delete id that is equal to id that i passed into URL request
        }
    }).then(function (data) {
        console.log("Person deleted");
        res.sendStatus(200).send(data);
    });
});

//insert a new account into database
app.post("/users", function (req, res) {

    var body = _.pick(req.body, "email" , "password");


    db.users.create({
            email: body.email,
            password: body.password
    }).then(function (data) {
        if (data) {
            res.status(200).send(_.pick(data.toJSON(), "email", "createdAt", "updatedAt"));
        }
    }, function (e) {
        res.send(e);
    })

});

// API for login with an existing account
app.post("/users/login", function (req, res) {

    var body = _.pick(req.body, "email", "password");   //filter body request for send into authenticate method only email and password
    var userInstance;

    db.users.authenticate(body).then(function (user) {
        userInstance = user;
        var token = user.generateToken("authentication");   // generate a token for use authorization from the user into other request

        return db.token.create({    //insert the token hashed into table ( column tokenHash )
            tokenHash: token
        });

        
    }).then(function(tokenInstance){

        console.log("You are logged");
        //built a response inserting tokenHash from the table into header responde and send the user record
        res.header("Auth", tokenInstance.get("tokenHash")).send(_.pick(userInstance, "email"))

    }, function (e) {
        res.status(401).send("Incorrect username or password. Please try again");
    })

});

//for delete form the token table, the token that user pass into header request
app.delete("/users/login",middlewareAuth, function (req, res) {
    
    req.token.destroy().then(function () {

        res.status(200).send("You've signed out! See you again soon!");
    }, function (e) {
        res.status(404).send();
    })
})

>>>>>>> 0d9516d7a7c7afeba43b65959015fcd6c4d4c748
app.listen(8080);