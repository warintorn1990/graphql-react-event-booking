const express = require("express");
var { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(`mongodb://localhost:27017/event`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
