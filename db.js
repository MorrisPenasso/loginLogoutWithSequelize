var db = [];

var Sequelize = require("sequelize");
var sequelize = new Sequelize(undefined, undefined, undefined, {    //create a new sequelize database
    dialect: "sqlite",  //specify the dialect
    storage: __dirname + "/data/database-sequelize.sqlite" // specify the file that will contain the data
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.model = sequelize.import("./models/model.js");
db.users = sequelize.import("./models/users.js");
module.exports = db;