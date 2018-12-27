const { buildSchema } = require('graphql');
const Target = require('./target');
const Contact = require('./contact');

let schemas = [Target, Contact];
let types = [];
let inputs = [];
let queries = [];
let mutations = [];

schemas.forEach(schema => {
    types.push(schema.types);
    inputs.push(schema.inputs);
    queries.push(schema.queries);
    mutations.push(schema.mutations);
});

module.exports = buildSchema(`
    ${types.join('\n')}
    ${inputs.join('\n')}
    type Query {
        ${queries.join('\n')}
    }
    type Mutation {
        ${mutations.join('\n')}
    }
`);