import React from 'react';
import PropTypes from 'prop-types';

const version = require('../../../package.json').version;

function Main(props) {
    return (
        <div className="d-flex flex-column" id="root">
            <small style={{ position: "fixed", userSelect: "none", cursor: "default", zIndex: "999" }}>v{version}</small>
            {props.children}
        </div >
    );
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Main;