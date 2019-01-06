import React from 'react';
import { Query } from "react-apollo";
import { GetContacts } from '../GraphQL/queries';

export default (WrappedComponent) => {
        return (props) => (
            <Query query={GetContacts}>
                {({ loading, error, data }) => {
                    return <WrappedComponent contactsLoading={loading} contactsError={error} contactsData={data} {...props} />;
                }}
            </Query>
        )
}