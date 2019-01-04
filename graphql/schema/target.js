module.exports = {
    types: `
        type Target {
            id: ID!
            name: String!
            status: String!
            contacts: [Contact!]!
        }
    `,
    inputs: `
        input TargetInput {
            name: String
            status: String
            contactIds: [ID!]
        }
    `,
    queries: `
        getTargets: [Target!]!
        getTarget(id: ID!): Target!
    `,
    mutations: `
        createTarget(input: TargetInput): Target
        updateTarget(id: ID!, input: TargetInput): Target
        deleteTarget(id: ID!): ID
    `
}