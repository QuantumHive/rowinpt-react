import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import UserRow from '../components/users/UserRow';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: "",
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
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
            <div className="col p-0">
                <div className="input-group p-1">
                    <span className="input-group-addon">
                        <i className="fa fa-search" />
                    </span>
                    <input type="text" className="form-control" placeholder="Zoeken" onChange={this.handleSearchInputChange} />
                </div>
                <div className="list-group">
                    {
                        this.props.users.map(user => {
                            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
                            if(fullName.indexOf(filter) === -1) return;
                            return <UserRow key={user.id} user={user} />;
                        })
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