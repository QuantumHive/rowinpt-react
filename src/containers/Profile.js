import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/userActions';

import UserStats from '../components/profile/UserStats';

class Profile extends React.Component {
    render() {
        const user = this.props.user;

        return (
            <div className="col p-0">
                <div className="jumbotron jumbotron-fluid mb-3">
                    <div className="container-fluid">
                        <div className="justify-content-start d-flex">
                            <div>
                                {user.avatar === undefined ?
                                    <div className="avatar-circle">
                                        <span className="initials">{user.name[0]}</span>
                                    </div> :
                                    <img src={user.avatar} className="rounded-circle" width="100" height="100" />
                                }
                                <p className="lead text-center mt-3">{user.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <UserStats />
            </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {
        user: { id: 1, name: "Naam", }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);