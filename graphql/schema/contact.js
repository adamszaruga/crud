module.exports = {
    types: `
        type Contact {
            id: ID!
            target: Target
            name: String!
            title: String
            phone: String
            email: String
        }
    `,
    inputs: `
        input ContactInput {
            name: String!
            title: String
            phone: String
            email: String
            targetId: ID
        }
    `,
    queries: `
        getContacts: [Contact!]!
        getContact(id: ID!): Contact!
    `,
    mutations: `
        createContact(input: ContactInput): Contact
        updateContact(id: ID!, input: ContactInput): Contact
        deleteContact(id: ID!): Boolean
    `
}