import gql from "graphql-tag";

export const GetContacts = gql`
query GetContacts {
    getContacts {
        id
        name
        phone
        email
        title
        isBookmarked @client
        target {
            id
            name
        }
    }
}`;

export const GetTargets = gql`
query GetTargets {
    getTargets {
        id
        name
        status
        isBookmarked @client
        contacts {
            id
            name
            phone
            email
        }
    }
}`;
