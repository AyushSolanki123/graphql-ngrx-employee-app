const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers["authorization"];
    const authToken = authorizationHeader && authorizationHeader.split(" ")[1];
    if (authToken == null) {
        return res.status(401).send({ message: "Employee not Authentication" });
    }

    jwt.verify(authToken, authConfig.accessKey, (err, user) => {
        if (err) {
            return res.status(401).send({ message: "Token expired" });
        }
        req.user = user;
        next();
    });
}

module.exports = { verifyToken };
