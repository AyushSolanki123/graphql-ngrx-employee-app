const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

function generateAuthPairs(payload, refreshPayload) {
    return new Promise((resolve, reject) => {
        const jwtKey = authConfig.jwtKey;
        const refreshKey = authConfig.refreshKey;
        const authToken = jwt.sign(payload, jwtKey, {
            expiresIn: authConfig.tokenValidity,
        });
        const refreshToken = jwt.sign(refreshPayload, refreshKey);
        resolve({
            authToken: authToken,
            refreshToken: refreshToken,
        });
    });
}

function validateAuthToken(token, tokenType = 0) {
    // 0 for auth token , 1 for refresh token
    return new Promise(function (resolve, reject) {
        const jwtKey = authConfig.jwtKey;
        const refreshKey = authConfig.refreshKey;
        jwt.verify(
            token,
            tokenType === 0 ? jwtKey : refreshKey,
            (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            }
        );
    });
}

function checkLoginStatus(authToken) {
    let result;
    const options = {
        expiresIn: authConfig.tokenValidity,
    };
    const secret = authConfig.jwtKey;
    try {
        result = jwt.verify(authToken, secret, options);
        if (result) return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    generateAuthPairs: generateAuthPairs,
    validateAuthToken: validateAuthToken,
    checkLoginStatus: checkLoginStatus,
};
