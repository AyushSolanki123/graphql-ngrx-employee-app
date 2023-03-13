const ErrorBody = require("../Utils/ErrorBody");
const { validateAuthToken } = require("../utils/Helper");

async function verifyToken(req, res, next) {
    const authorizationHeader = req.headers["authorization"];
    const _authToken = authorizationHeader && authorizationHeader.split(" ")[1];
    if (_authToken) {
        try {
            const response = await validateAuthToken(_authToken);
            req.email = response.email;
            req.id = response.id;
            next();
        } catch (error) {
            next(
                new ErrorBody(
                    401,
                    error.message || "No auth token found in the request"
                )
            );
        }
    } else {
        next(new ErrorBody(401, "No auth token found in the request"));
    }
}

module.exports = {
    verifyToken: verifyToken,
};
