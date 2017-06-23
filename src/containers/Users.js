import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import UserRow from '../components/users/UserRow';

class Users extends React.Component {
    render() {
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
                        this.props.users.map(user =>
                            <UserRow key={user.id} user={user} />)
                    }
                </div>
            </div>
        );
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.user
    };
}

export default connect(
    mapStateToProps
)(Users);