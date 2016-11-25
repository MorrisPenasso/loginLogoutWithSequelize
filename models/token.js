var crypto = require("crypto-js");


module.exports = function (sequelize, DataTypes) {

    return sequelize.define("token", {
        token: {
            type: DataTypes.VIRTUAL,
            set: function(value) {
                var tokenHash = crypto.MD5(value).toString();
                this.setDataValue("token", value);
                this.setDataValue("tokenHash", tokenHash)
            }
        },
        tokenHash: {
            type: DataTypes.STRING
        }

    })


};