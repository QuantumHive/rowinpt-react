import React from "react";
import Axios from "axios";
import Spinner from "react-spinkit";
import { connect } from "react-redux";

class MailList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            users: [],
            locationId: 0
        };

        this.locationChange = this.locationChange.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/users/maillist", { withCredentials: true }).then(response => {
            this.setState({ loading: false, users: response.data });
        });
    }

    locationChange(event) {
        const locationId = parseInt(event.target.value);
        this.setState({locationId});
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="d-flex justify-content-center col p-0">
                    <Spinner className="align-self-center" name="double-bounce" fadeIn="half" style={{ width: "90px", height: "90px" }} />
                </div>
            );
        }
        if (this.state.users.length === 0) {
            return (
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <p className="text-success lead">Niemand is afwezig geweest de afgelopen 2 weken :)</p>
                </div>
            );
        }
        return (
            <div className="col p-0">
                <div className="form-group my-2 text-center">
                    <select className="custom-select" value={this.state.locationId} onChange={this.locationChange}>
                        <option key={0} value={0} disabled={true}>Locaties</option>
                        {this.props.locations.map(location => {
                            return (
                                <option key={location.id} value={location.id}>{location.location}</option>
                            );
                        })}
                    </select>

                    <a href={`/api/users/maillist/download/${this.state.locationId}`}
                       className={`btn ml-3 btn-outline-primary ${this.state.locationId === 0 ? "disabled" : ""}`}>
                        Download
                    </a>
                </div>

                <ul className="list-group">
                    {this.state.users.map(user => {
                        return (
                            <li key={user.id} className="list-group-item">
                                {user.firstName} {user.lastName}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locations: state.cache === null ? [] : state.cache.locations
    };
}

export default connect(
    mapStateToProps
)(MailList);