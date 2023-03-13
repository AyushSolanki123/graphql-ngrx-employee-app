const router = require("express").Router();

router.use("/auth", require("./AuthRoutes"));

router.get("/", (req, res, next) => {
    res.redirect("/graphiql");
});

module.exports = router;
