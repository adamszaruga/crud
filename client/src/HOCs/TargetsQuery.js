import React from 'react';
import { Query } from "react-apollo";
import { GetTargets } from '../GraphQL/queries';

export default (WrappedComponent) => {
    return (props) => (
        <Query query={GetTargets}>
            {({ loading, error, data }) => {
                return <WrappedComponent loading={loading} error={error} data={data} {...props} />;
            }}
        </Query>
    )
}