var crypto = require("crypto-js");

module.exports = function (db) {

    return function (req, res, next) {

        var token = req.get("Auth");

        db.token.findOne({
            where: {
                tokenHash: crypto.MD5(token).toString()
            }
        }).then(function (tokenMatched) {
            req.token = tokenMatched;   //for access in this property from only api ( req.body / req.token ... )
            next();
        })
    }

};