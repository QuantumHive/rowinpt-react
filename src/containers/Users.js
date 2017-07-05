import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/userActions';
import UserRow from '../components/users/UserRow';
import Spinner from 'react-spinkit';
import * as paths from '../constants/routePaths';
import * as routeActions from '../actions/routeActions';
import _ from 'lodash';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: "",
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchUsers();
        this.props.routeActions.setPrimaryCommandBar({
            primary: {
                name: 'User toevoegen',
                url: paths.NewUser
            },
            secondary: null
        });
    }

    handleSearchInputChange(event) {
        const value = event.target.value.toLowerCase();
        this.setState({
            filterText: value
        });
    }

    render() {
        const filter = this.state.filterText;
        return (
            <div className="col p-0 d-flex flex-column">
                <div className="input-group p-1">
                    <span className="input-group-addon">
                        <i className="fa fa-search" />
                    </span>
                    <input type="text" className="form-control" placeholder="Zoeken" onChange={this.handleSearchInputChange} />
                </div>

                {!this.props.isFetching ?
                    <div className="list-group">
                        {
                            _.orderBy(this.props.users, ['firstName', 'lastName']).map(user => {
                                const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
                                if (fullName.indexOf(filter) === -1) return;
                                return <UserRow key={user.id} user={user} />;
                            })
                        }
                    </div> : <div className="d-flex justify-content-center col p-0">
                        <Spinner className="align-self-center" name="double-bounce" fadeIn="half" style={{ width: "90px", height: "90px" }} />
                    </div>}
            </div>
        );
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    routeActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        users: state.users.items,
        isFetching: state.users.isFetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        routeActions: bindActionCreators(routeActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);