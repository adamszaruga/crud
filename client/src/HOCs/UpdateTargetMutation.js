import React from 'react';
import { Mutation } from "react-apollo";
import { UpdateTarget } from '../GraphQL/mutations';

export default (WrappedComponent) => {
    return (props) => (
        <Mutation
            mutation={UpdateTarget}
        >
            {(updateTarget, { loading, error, data }) => {
                return <WrappedComponent updateTargetData={data} updateTarget={updateTarget} updateTargetLoading={loading} updateTargetError={error} {...props} />;
            }}
        </Mutation>
    )
}