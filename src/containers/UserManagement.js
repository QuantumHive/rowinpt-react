import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import {bindActionCreators} from 'redux';
//import * as actions from '../actions/';

class UserManagement extends React.Component {
    render() {
        return (
            <div className="">
                User
            </div>
        );
    }
}

UserManagement.propTypes = {
    //actions: PropTypes.object.isRequired
};

// function mapStateToProps(state, ownProps){
//     return {};
// }

// function mapDispatchToProps(dispatch){
//     return {
//         //actions: bindActionCreators(actions, dispatch)
//     };
// }

export default connect(
    //mapStateToProps,
    //mapDispatchToProps
)(UserManagement);