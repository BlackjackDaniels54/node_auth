const jwt = require('jsonwebtoken');
const { secret } = require("../config")



module.exports = function (roles) {
    return function (req, res, next){
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            console.log(req);
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(403).json({message: "No role token User "})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false;
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true
                }
            });
            if(!hasRole) {
                return res.status(403).json({message: "You don't have access to this function"})
            }
            next();
        }catch(e) {
            console.log(e);
            return res.status(403).json({message: "User is not role auth"})
        }
    }
}