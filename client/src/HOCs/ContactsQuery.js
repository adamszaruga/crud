import React from 'react';
import { Query } from "react-apollo";
import { GetContacts } from '../GraphQL/queries';

export default ({Child}) => (
    <Query
        query={GetContacts}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <Child data={data}/>;
        }}
    </Query>
);