import React from 'react';
import { Query } from "react-apollo";
import { GetTargets } from '../GraphQL/queries';

export default ({Child}) => (
    <Query
        query={GetTargets}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            
            return <Child data={data} />;
        }}
    </Query>
);