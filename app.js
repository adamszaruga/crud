const express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');
let Faker = require('faker');

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
        contactIds: [ID!]
    }

    input ContactInput {
        name: String!
        title: String
        phone: String
        email: String
        targetId: ID
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
        createContact(input: ContactInput): Contact
        updateContact(id: ID!, input: ContactInput): Contact
        deleteContact(id: ID!): Boolean
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
        input.id = Faker.random.uuid();
        if (input.contactIds) {
            input.contactIds = input.contactIds.filter(contactId => contacts.some(contact => contact.id === contactId));
        } else {
            input.contactIds = []
        }
        targets.push(input);
        return new Target(input);
    },
    updateTarget: ({id, input}) => {
        let index = targets.findIndex(target => target.id === id);
        let target = targets[index];

        if (input.contactIds) {
            input.contactIds = input.contactIds.filter(contactId => contacts.some(contact => contact.id === contactId));
            contacts.forEach(contact => {
                if (input.contactIds.indexOf(contact.id) > -1) {
                    contact.targetId = id;
                } else {
                    if (contact.targetId === id) contact.targetId = undefined;
                }
            })
            targets.forEach(target => {
                if (target.id !== id) {
                    let contactsToSplice = [];
                    target.contactIds.forEach((contactId, index) => {
                        if (input.contactIds.indexOf(contactId) > -1 ) {
                            contactsToSplice.push(index);
                        }
                    })
                    while (contactsToSplice.length > 0) {
                        target.contactIds.splice(contactsToSplice.pop(), 1);
                    }
                }
            })
        }

        let updated = Object.assign({}, target, input)
        console.log(input);
        console.log(updated);
        targets.splice(index, 1, updated)
        return new Target(updated);
    },
    deleteTarget: ({id}) => {
        let index = targets.findIndex(target => target.id === id);
        if (index > -1) {
            targets.splice(index, 1);
            contacts.forEach(contact => {
                if (contact.targetId === id) contact.targetId = undefined;
            });
            return true;
        } else {
            return false;
        }
    },
    createContact: ({input}) => {
        if (input.targetId && !targets.some(target => target.id === input.targetId)) input.targetId = undefined;
        input.id = Faker.random.uuid();
        contacts.push(input);
        return new Contact(input);
    },
    updateContact: ({id, input}) => {
        let index = contacts.findIndex(contact => contact.id === id);
        let contact = contacts[index];

        if (!targets.some(target => target.id === input.targetId)) input.targetId = undefined;

        if (input.targetId) {
            targets.forEach(target => {
                if (target.id === input.targetId) {
                    if (target.contactIds.indexOf(id) === -1) target.contactIds.push(id);
                } else {
                    let contactIndex = target.contactIds.findIndex(contactId => contactId === id);
                    if (contactIndex > -1) target.contactIds.splice(contactIndex, 1);
                }
            })
        }
        let updated = Object.assign({}, contact, input);

        contacts.splice(index, 1, updated)
        return new Contact(updated);
    },
    deleteContact: ({id}) => {
        let index = contacts.findIndex(contact => contact.id === id);
        if (index > -1) {
            contacts.splice(index, 1);
            targets.some(target => {
                let contactIndex = target.contactIds.findIndex(id)
                if ( contactIndex > -1) {
                    target.contactIds.splice(contactIndex, 1);
                    return true;
                }
            })
            return true;
        } else {
            return false;
        }
        
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