var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

    var user = sequelize.define("users", {
        email: {
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
            type: DataTypes.VIRTUAL,
            allowNull: false,
            set: function (value) {

                var salt = bcrypt.genSaltSync(10);
                var hashPassword = bcrypt.hashSync(value, salt);

                this.setDataValue("password", value);
                this.setDataValue("salt", salt);
                this.setDataValue("passwordHashed", hashPassword);
            }
        }
    })

    return user;
};