const ErrorBody = require("../Utils/ErrorBody");
const Employee = require("../model/Employee").model;
const router = require("express").Router();
const bcrpyt = require("bcrypt");
const { generateAuthPairs } = require("../utils/Helper");
const { body, validationResult } = require("express-validator");
const { logger } = require("../utils/Logger");

router.post(
    "/login",
    [body("email").isEmail(), body("password").notEmpty()],
    (req, res, next) => {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            logger.error("Failed in Login employee" + errors);
            next(new ErrorBody(400, "Invalid Values in form"));
        } else {
            const { email, password } = req.body;
            Employee.findOne({ email })
                .then((employee) => {
                    if (!employee) {
                        throw new ErrorBody(
                            401,
                            "Employee doesn't exist in system, please register"
                        );
                    } else {
                        return bcrpyt.compare(password, employee.password);
                    }
                })
                .then((passwordsMatch) => {
                    if (!passwordsMatch) {
                        throw new ErrorBody(
                            401,
                            "Incorrect password entered, please try again"
                        );
                    } else {
                        const refreshPayload = {
                            email: email,
                            password: password,
                            type: "REFRESH",
                        };
                        const authPayload = {
                            email: email,
                            password: password,
                            type: "AUTH",
                        };

                        return generateAuthPairs(authPayload, refreshPayload);
                    }
                })
                .then((tokenPair) => {
                    res.status(200);
                    res.json({
                        message: "Login Successful",
                        tokenPair: tokenPair,
                    });
                })
                .catch((error) => {
                    logger.log("Failed in Login Employee");
                    logger.log(error);
                    next(
                        new ErrorBody(
                            error.statusCode || 500,
                            error.errorMessage || "Internal Server Error"
                        )
                    );
                });
        }
    }
);

router.post(
    "/register",
    [
        body("firstName").notEmpty(),
        body("email").isEmail(),
        body("password").notEmpty(),
        body("dob").notEmpty(),
        body("company").notEmpty(),
    ],
    (req, res, next) => {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            logger.error("Failed in Login employee" + errors);
            next(new ErrorBody(400, "Invalid Values in form"));
        } else {
            const { email, password } = req.body;
            let _password = null;
            Employee.findOne({ email })
                .then((employee) => {
                    if (employee) {
                        throw new ErrorBody(
                            401,
                            "Employee already existing, please login"
                        );
                    }
                    return bcrpyt.hash(password, 10);
                })
                .then((hashedPassword) => {
                    _password = hashedPassword;
                    return Employee.find({}).count();
                })
                .then((count) => {
                    const reqBody = {
                        ...req.body,
                        id: count + 1001,
                        password: _password,
                    };
                    return Employee.create(reqBody);
                })
                .then((response) => {
                    res.status(200);
                    res.json({
                        message: "Employee Registered Successfully",
                        data: {
                            ...response._doc,
                            _id: response._id.toString(),
                        },
                    });
                })
                .catch((error) => {
                    logger.error("Failed in Register Employee: " + error);
                    next(
                        new ErrorBody(
                            error.statusCode || 500,
                            error.errorMessage || "Internal Server Error"
                        )
                    );
                });
        }
    }
);

router.post(
    "/refreshToken",
    [body("refreshToken").notEmpty()],
    (req, res, next) => {
        const { errors } = validationResult(req);

        if (errors.length > 0) {
            logger.error("Failed in Login employee" + errors);
            next(new ErrorBody(400, "Invalid Values in form"));
        } else {
            const { refreshToken } = req.body;
            validateAuthToken(refreshToken, 1)
                .then((response) => {
                    if (response.iat) {
                        delete response.iat;
                    }
                    return generateAuthPairs(response, response);
                })
                .then((tokenPair) => {
                    res.status(200);
                    res.json({
                        authToken: tokenPair.authToken,
                    });
                })
                .catch((error) => {
                    logger.error(
                        "Failed in refreshToken: " + JSON.stringify(error)
                    );
                    next(
                        new ErrorBody(
                            error.statusCode || 500,
                            error.errorMessage || "Internal Server Error"
                        )
                    );
                });
        }
    }
);

module.exports = router;
