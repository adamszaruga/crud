import React from 'react';
import { Query } from "react-apollo";
import { getContacts } from '../GraphQL/queries';

export default ({Child}) => (
    <Query
        query={getContacts}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <Child data={data}/>;
        }}
    </Query>
);