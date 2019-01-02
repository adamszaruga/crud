import React from 'react';
import { Mutation } from "react-apollo";
import { CreateTarget } from '../GraphQL/mutations';
import { GetTargets }  from '../GraphQL/queries';

export default ({ Child }) => (
    <Mutation
        mutation={CreateTarget}
        update={(cache, {data: { createTarget }})=>{
            const { getTargets } = cache.readQuery({ query: GetTargets});
            cache.writeQuery({
                query: GetTargets,
                data: { getTargets: getTargets.concat([createTarget]) }
            })
        }}
    >
        {(createTarget, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <Child data={data} mutationTrigger={createTarget} />;
        }}
    </Mutation>
);