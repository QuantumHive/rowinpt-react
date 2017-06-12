import React from 'react';
import { PropTypes } from 'prop-types';
import UserRow from './UserRow';

const tableWrap = {
    tableLayout: 'fixed',
    wordWrap: 'break-word'
};

function UserTable({users}) {
    return (
        <table className="table" style={tableWrap}>
            <thead>
                <tr>
                    <th>Naam</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => 
                    <UserRow key={user.id} user={user} />)
                }
            </tbody>
        </table>
    );
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired
};

export default UserTable;