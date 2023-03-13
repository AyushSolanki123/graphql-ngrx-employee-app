const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { default: mongoose } = require("mongoose");

const dbConfig = require("./config/db.config");
const { typeDefs, resolvers } = require("./graphql");
const { logger } = require("./utils/Logger");
const { verifyToken } = require("./middleware/auth");

// PORT
const PORT = 4000;

// Create Schema and rootValue
const schema = buildSchema(typeDefs);
const rootValue = { ...resolvers.Query, ...resolvers.Mutation };

// Create the express app
const app = express();

// Add the middlewares
app.use(cors());
app.use(bodyParser());

// Auth Routes Added
app.use("/", require("./routes"));

// Allow requests to the GraphiQL endpoint without authentication
app.use(
    "/graphiql",
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
    })
);

// Authenticate requests to the GraphQL endpoint
app.use("/graphql", verifyToken);

// Handle authenticated requests to the GraphQL endpoint
app.use(
    "/graphql",
    graphqlHTTP({
        schema: buildSchema(typeDefs),
        rootValue: { ...resolvers.Query, ...resolvers.Mutation },
        graphiql: false,
    })
);

// Global Error Handler
app.use("/", (err, req, res, next) => {
    logger.error("Error occurred");
    logger.log(JSON.stringify(err));
    logger.error(err.errorMessage || "Server error occurred");
    res.status(err.statusCode || 500);
    res.json({ errorMessage: err.errorMessage || "Server error occurred" });
});

mongoose
    .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.log("Connected to mongodb Successfully");

        app.listen(PORT, (err) => {
            if (err) {
                logger.error("Unable to start the serer");
                logger.error(JSON.stringify(err));
                process.exit();
            }
            logger.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        logger.error("Unable to connect to mongodb");
        logger.error(JSON.stringify(error));
        process.exit();
    });
