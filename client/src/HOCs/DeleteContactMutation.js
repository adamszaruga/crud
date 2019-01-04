import React from 'react';
import { Mutation } from "react-apollo";
import { DeleteContact } from '../GraphQL/mutations';
import { GetContacts } from '../GraphQL/queries';

export default (WrappedComponent) => {
    return (props) => (
        <Mutation
            mutation={DeleteContact}
            update={(cache, { data: { deleteContact } }) => {
                const { getContacts } = cache.readQuery({ query: GetContacts });
                let index = getContacts.findIndex(contact => contact.id === deleteContact);
                if (index > -1) {
                    let newContacts = getContacts.splice(0, index).concat(getContacts.splice(index + 1));
                    cache.writeQuery({
                        query: GetContacts,
                        data: { getContacts: newContacts}
                    })
                }
                
            }}
        >
            {(deleteContact, { loading, error, data }) => {
                return <WrappedComponent deleteContactData={data} deleteContact={deleteContact} deleteContactLoading={loading} deleteContactError={error} {...props} />;
            }}
        </Mutation>
    )
}