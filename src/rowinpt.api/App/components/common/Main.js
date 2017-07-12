import React from 'react';
import PropTypes from 'prop-types';

const version = require('../../../package.json').version;

function Main(props) {
    return (
        <div className="d-flex flex-column" id="root">
            {
                props.role !== undefined && props.role !== "User"
                ? <small style={{ position: "fixed", userSelect: "none", cursor: "default", zIndex: "999" }}>v{version}</small>
                : false
            }
            
            {props.children}
        </div >
    );
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string,
};

export default Main;