import gql from "graphql-tag";

export const getContacts = gql`
{
    getContacts {
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
}`;

export const getTargets = gql`
{
    getTargets {
        id
        name
        status
        contacts {
            id
            name
            phone
            email
        }
    }
}`;