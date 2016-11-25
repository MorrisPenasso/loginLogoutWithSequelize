var crypto = require("crypto-js");

module.exports = function (db) {

    return function (req, res, next) {

        var token = req.get("Auth") || "";  // take tokenHash that will be inserted into header ( crypted + hashted )

        db.token.findOne({
            where: {
                tokenHash: token
            }
        }).then(function (tokenMatched) {
            if (tokenMatched) {
                req.token = tokenMatched;   //for access in this property from only api ( req.body / req.token ... )
                next();
            } else {
                res.status(401).send();
            }
        })
    }

};