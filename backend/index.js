const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { default: mongoose } = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const dbConfig = require("./config/db.config");
const { typeDefs, resolvers } = require("./graphql");

// define port to run the server
const PORT = 4000;

// Create Apollo Server Instance
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();

    // create an instance of express server
    const app = express();
    app.use(cors());
    app.use(bodyParser());

    // apply express middleware to apollo server
    server.applyMiddleware({ app });

    mongoose
        .connect(dbConfig.url, {})
        .then(() => {
            console.log("Connected to mongodb successfully");

            app.listen(PORT, (err) => {
                if (err) {
                    console.log("Unable to start the server");
                    console.log(err);
                    process.exit();
                }
                console.log(
                    `Server started successfully at url: http://localhost:${PORT}${server.graphqlPath}`
                );
            });
        })
        .catch((error) => {
            console.log("Unable to connect to mongodb");
            console.log(error);
            process.exit();
        });
}

startServer();
