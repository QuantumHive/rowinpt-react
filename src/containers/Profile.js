import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserStats from '../components/profile/UserStats';

class Profile extends React.Component {
    render() {
        const user = this.props.user;

        return (
            <div className="col p-0">
                <div className="jumbotron jumbotron-fluid mb-3">
                    <div className="container-fluid">
                        <div className="d-flex">
                            <div className="text-center">
                                {user.avatar === undefined ?
                                    <div className="avatar-circle">
                                        <span className="initials">{user.name[0]}</span>
                                    </div> :
                                    <img src={user.avatar} className="rounded-circle" width="100" height="100" />
                                }
                                <p className="lead mt-3">{user.name}</p>
                            </div>
                            <div className="ml-3 mt-1">
                                <p><strong>Gewicht:</strong> 81 kg</p>
                                <p><strong>Vetgehalte:</strong> 76%</p>
                                <p><strong>Omvang:</strong> 88 cm</p>
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
};

function mapStateToProps() {
    return {
        user: { id: 1, name: "Naam", }
    };
}

export default connect(
    mapStateToProps
)(Profile);