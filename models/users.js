var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

    var user = sequelize.define("users", {  // define new model/table called "users"
        email: {    //define a column
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        salt: {
            type: DataTypes.STRING
        },
        passwordHashed: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL, // this column will not be showed with VIRTUAL
            allowNull: false,
            set: function (value) { // for update or modify the value that will be stored into this column

                var salt = bcrypt.genSaltSync(10);  //generate a salt string
                var hashPassword = bcrypt.hashSync(value, salt); // hide the password with hash function of bcrypt package

                
                this.setDataValue("password", value);
                this.setDataValue("salt", salt);
                this.setDataValue("passwordHashed", hashPassword);
            }
        }
    }, {
        classMethods: {
            authenticate: function (body) {
                return new Promise(function (resolve, reject) { // for set a positive or negative result
                    
                    if (typeof body.email == "string" && typeof body.password == "string") {

                        user.findOne({
                            where: {
                                email: body.email   // for search if the existing email into database is equeals to email that i receive from the request
                            }
                        }).then(function (userFinded) {
                            //if the email has been finded and the password that is been send is equals to passwordHash into database
                            if (userFinded && bcrypt.compareSync(body.password, userFinded.get("passwordHashed"))) {

                                return resolve(userFinded); // return a positive result and pass the entire record of the account
                            } else {
                                reject();   //return a negative result if the email or password not matched
                            }
                        }, function (e) {
                            reject();   //return a negative result if the email not matched
                        })
                    }
                        
                })
            }
        }
    })

    return user;
};