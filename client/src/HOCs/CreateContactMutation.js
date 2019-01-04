import React from 'react';
import { Mutation } from "react-apollo";
import { CreateContact } from '../GraphQL/mutations';
import { GetContacts } from '../GraphQL/queries';

export default (WrappedComponent) => {
    return (props) => (
        <Mutation
            mutation={CreateContact}
            update={(cache, { data: { createContact } }) => {
                const { getContacts } = cache.readQuery({ query: GetContacts });
                cache.writeQuery({
                    query: GetContacts,
                    data: { getContacts: getContacts.concat([createContact]) }
                })
            }}
        >
            {(createContact, { loading, error, data }) => {
                return <WrappedComponent createContactLoading={loading} createContactError={error} creationData={data} createContact={createContact} {...props} />;
            }}
        </Mutation>
    )
}