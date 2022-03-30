import React from 'react';

const ErrorLabel = (props) => {
    return (
        <div style={{color: 'red'}}>
            {props.children}
        </div>
    );
};

export default ErrorLabel;
