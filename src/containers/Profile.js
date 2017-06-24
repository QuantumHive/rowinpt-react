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
                        <div className="justify-content-center d-flex">
                            <img src={user.avatar} alt="..." className="rounded-circle" />
                        </div>
                        <div className="justify-content-center d-flex mt-3">
                            <p className="lead">{user.name}</p>
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
        user: { id: 1, name: "Naam", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/boxmodel/128.jpg" }
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