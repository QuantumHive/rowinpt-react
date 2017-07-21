import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function UserRow({ user }) {
    console.log(user.emailconfirmed);
    return (
        <Link to={`/users/${user.id}`} className={`list-group-item list-group-item-action d-flex flex-nowrap justify-content-between ${user.emailConfirmed && user.role !== "Mod" ? "list-group-item-warning" : ""}`}>
            <h5>
                {user.firstName} {user.lastName}
                
            </h5>
            {user.role === "Mod"
                ? <h5><i className="fa fa-star" /></h5> : false
            }
        </Link>
    );
}

UserRow.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserRow;