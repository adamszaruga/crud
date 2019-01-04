import React from 'react';
import { Mutation } from "react-apollo";
import { UpdateContact } from '../GraphQL/mutations';

export default (WrappedComponent) => {
    return (props) => (
        <Mutation
            mutation={UpdateContact}
        >
            {(updateContact, { loading, error, data }) => {
                return <WrappedComponent updateContactData={data} updateContact={updateContact} updateContactLoading={loading} updateContactError={error} {...props} />;
            }}
        </Mutation>
    )
}