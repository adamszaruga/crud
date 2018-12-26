const express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

global.db = require('./db/seed');
let {targets, contacts} = db;

let Target = require('./db/resolvers/target');
let Contact = require('./db/resolvers/contact');


let schema = buildSchema(`
    type Contact {
        id: ID!
        target: Target
        name: String!
        title: String
        phone: String
        email: String
    }
    type Target {
        id: ID!
        name: String!
        status: String!
        contacts: [Contact!]!
    }

    input TargetInput {
        name: String
        status: String
    }

    input ContactInput {
        name: String
        title: String
        phone: String
        email: String
    }

    type Query {
        getTargets: [Target!]!
        getTarget(id: ID!): Target!
        getContacts: [Contact!]!
        getContact(id: ID!): Contact!
    }
    type Mutation {
        createTarget(input: TargetInput): Target
        updateTarget(id: ID!, input: TargetInput): Target
        deleteTarget(id: ID!): Boolean
        createContact(targetId: ID, input: ContactInput): Contact
        updateContact(id: ID!, input: ContactInput): Contact
        deleteContact(targetId: ID, id: ID!): Boolean
    }
`);

var root = {
    getTargets: () => {
        return targets.map(target=> new Target(target))
    },
    getTarget: ({id}) => {
        return new Target(targets.find(target => target.id === id));
    },
    getContacts: () => {
        return contacts.map(contact => new Contact(contact))
    },
    getContact: ({id}) => {
        return new Contact(contacts.find(contact => contact.id === id));
    },
    createTarget: ({input}) => {
        return "hi"
    },
    updateTarget: ({id, input}) => {
        return "hi"
    },
    deleteTarget: ({id}) => {
        return "hi"
    },
    createContact: ({targetId, input}) => {
        return "hi"
    },
    updateContact: ({id, input}) => {
        return "hi"
    },
    deleteContact: () => {
        return "hi"
    }
};
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');