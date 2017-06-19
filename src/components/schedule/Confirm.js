import React from 'react';
import PropTypes from 'prop-types';
import Summary from './Summary';

function Confirm({ schedule, cache, submit }) {
    return (
        <div className="col text-center pt-3">
            <Summary schedule={schedule} cache={cache} />
            <button role="button" className="btn btn-outline-success btn-lg btn-block" onClick={submit}>Aanmelden</button>
        </div>
    );
}

Confirm.propTypes = {
    schedule: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired
};

export default Confirm;