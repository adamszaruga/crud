import React from 'react';
import { Mutation } from "react-apollo";
import { DeleteTarget } from '../GraphQL/mutations';
import { GetTargets } from '../GraphQL/queries';

export default (WrappedComponent) => {
    return (props) => (
        <Mutation
            mutation={DeleteTarget}
            update={(cache, { data: { deleteTarget } }) => {
                const { getTargets } = cache.readQuery({ query: GetTargets });
                let index = getTargets.findIndex(target => target.id === deleteTarget);
                if (index > -1) {
                    let newTargets = getTargets.splice(0, index).concat(getTargets.splice(index + 1));
                    cache.writeQuery({
                        query: GetTargets,
                        data: { getTargets: newTargets }
                    })
                }

            }}
        >
            {(deleteTarget, { loading, error, data }) => {
                return <WrappedComponent deleteTargetData={data} deleteTarget={deleteTarget} deleteTargetLoading={loading} deleteTargetError={error} {...props} />;
            }}
        </Mutation>
    )
}