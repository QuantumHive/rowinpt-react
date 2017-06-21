import React from 'react';
import { PropTypes } from 'prop-types';
import UserRow from './UserRow';

function Users({ users }) {
    return (
        <div className="col p-0">
            <div className="input-group p-1">
                <span className="input-group-addon">
                    <i className="fa fa-search" />
                </span>
                <input type="text" className="form-control" placeholder="Zoeken" />
            </div>
            <div className="list-group">
                {
                    users.map(user =>
                        <UserRow key={user.id} user={user} />)
                }
            </div>
        </div>
    );
}

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;