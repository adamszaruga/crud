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
