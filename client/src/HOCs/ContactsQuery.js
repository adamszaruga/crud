import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GetContacts } from '../GraphQL/queries';

export default (WrappedComponent) => {
        return (props) => (
            <Query query={GetContacts}>
                {({ loading, error, data }) => {
                    return <WrappedComponent loading={loading} error={error} data={data} {...props} />;
                }}
            </Query>
        )
}