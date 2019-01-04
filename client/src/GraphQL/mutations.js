import gql from "graphql-tag";


export const CreateTarget = gql`
mutation CreateTarget($input: TargetInput!) {
    createTarget(input: $input) {
        id
        name
        status
        contacts {
            id
            name
            phone
            title
            email
        }
    }
}
`;

export const CreateContact = gql`
mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
        id
        name
        phone
        email
        title
        target {
            id
            name
        }
    }
}
`;

export const UpdateTarget = gql`
mutation UpdateTarget($id: ID!, $input: TargetInput!) {
    updateTarget(id: $id, input: $input) {
        id
        name
        status
        contacts {
            id
            name
            phone
            title
            email
        }
    }
}
`;


export const UpdateContact = gql`
mutation UpdateContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
        id
        name
        phone
        email
        title
        target {
            id
            name
        }
    }
}
`;

export const DeleteTarget = gql`
mutation DeleteTarget($id: ID!) {
    deleteTarget(id: $id) 
}
`;

export const DeleteContact = gql`
mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) 
}
`;
