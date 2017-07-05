import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function UserRow({ user }) {
    return (
        <Link to={`/users/${user.id}`} className="list-group-item list-group-item-action">
            <h5>
                {user.firstName} {user.lastName}
                {user.role === "Mod"
                    ? <i className="fa fa-star ml-2" /> : false
                }
            </h5>
        </Link>
    );
}

UserRow.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserRow;