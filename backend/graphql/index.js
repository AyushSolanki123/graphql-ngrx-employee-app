const fs = require("fs");
const queries = require("./queries");
const mutations = require("./mutations");

const resolvers = {
    Query: queries,
    Mutation: mutations,
};

module.exports = {
    typeDefs: fs.readFileSync("./graphql/schema.graphql", {
        encoding: "utf-8",
    }),
    resolvers: resolvers,
};
