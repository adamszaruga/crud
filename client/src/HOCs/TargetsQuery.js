import React from 'react';
import { Query } from "react-apollo";
import { getTargets } from '../GraphQL/queries';

export default ({Child}) => (
    <Query
        query={getTargets}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            
            return <Child data={data} />;
        }}
    </Query>
);