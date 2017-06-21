import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function UserRow({ user }) {
    return (
        <Link to="#" className="list-group-item list-group-item-action">
            <h5>{user.firstname} {user.lastname}</h5>
        </Link>
    );
}

UserRow.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserRow;