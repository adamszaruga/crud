import React from 'react';
import JSONPretty from 'react-json-pretty';

const Targets = ({data}) => (
    <div>
        <JSONPretty json={data} />
    </div>
)

export default Targets;
