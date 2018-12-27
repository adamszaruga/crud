import React from 'react';
import JSONPretty from 'react-json-pretty';

const Contacts = ({data}) => (
    <div>
        <JSONPretty json={data} />
    </div>
)

export default Contacts;