import React from 'react';
import { PropTypes } from 'prop-types';
import {Link} from 'react-router';

function UserRow({user}) {
    return (
        <tr>
            <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
            <td>{user.email}</td>
        </tr>
    );
}

UserRow.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserRow;