import React from 'react';
import { Mutation } from "react-apollo";
import { CreateTarget } from '../GraphQL/mutations';
import { GetTargets }  from '../GraphQL/queries';

export default (WrappedComponent) => {
    return (props) => (
        <Mutation
            mutation={CreateTarget}
            update={(cache, { data: { createTarget } }) => {
                const { getTargets } = cache.readQuery({ query: GetTargets });
                cache.writeQuery({
                    query: GetTargets,
                    data: { getTargets: getTargets.concat([createTarget]) }
                })
            }}
        >
            {(createTarget, { loading, error, data }) => {
                return <WrappedComponent createTargetLoading={loading} createTargetError={error} creationData={data} createTarget={createTarget} {...props} />;
            }}
        </Mutation>
    )
}