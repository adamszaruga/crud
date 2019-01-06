const express = require('express');
const graphqlHTTP = require('express-graphql');

global.db = require('./db/seed');

const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');

var app = express();

app.use(express.static(__dirname + '/client/build'));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');