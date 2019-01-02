import gql from "graphql-tag";

export const GetContacts = gql`
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

export const GetTargets = gql`
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