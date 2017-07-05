import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ModList extends React.Component {
    render() {
        const index = this.props.match.params.id;
        const users = this.props.work.items[index].registeredUsers;
        return (
            <div className="col p-0">
                <div className="list-group">
                    {
                        users.map((user, i) => {
                            return (
                                <div key={i} className="list-group-item d-flex flex-row flex-nowrap pl-0">
                                    <p className="lead m-0 pl-3">{user}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

ModList.propTypes = {
    work: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        work: state.work
    };
}

export default withRouter(connect(
    mapStateToProps,
)(ModList));