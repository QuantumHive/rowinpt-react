import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Moment from "moment";
import * as actions from "../actions/workActions";
import * as cacheActions from "../actions/cacheActions";
import * as filterActions from "../actions/filterActions";
import Spinner from "react-spinkit";

class Agenda extends React.Component {
    constructor(props) {
        super(props);

        this.locationChange = this.locationChange.bind(this);

    }
    componentDidMount() {
        this.props.actions.loadWork();
    }

    locationChange(event) {
        const value = parseInt(event.target.value);
        this.props.changeFilter(value);
    }

    render() {
        if (this.props.work.isLoading) {
            return (
                <div className="d-flex justify-content-center col p-0">
                    <Spinner className="align-self-center" name="double-bounce" fadeIn="half" style={{ width: "90px", height: "90px" }} />
                </div>
            );
        }

        if (this.props.work.items.length === 0) {
            return (
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <p className="text-info lead">Niemand heeft wat ingepland :(</p>
                    <p className="text-info lead">Motiveer je klanten om voor jouw les aan te melden :)</p>
                </div>
            );
        }

        return (
            <div className="col p-0">
                <div className="col p-0">

                    <div className="form-group my-2 text-center">
                        <select className="custom-select" value={this.props.locationId} onChange={this.locationChange}>
                            <option key={0} value={0}>Alle locaties</option>
                            {this.props.locations.map(location => {
                                return (
                                    <option key={location.id} value={location.id}>{location.location}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="list-group">
                        {
                            this.props.work.items.map((work, i) => {
                                if (this.props.locationId !== 0) {
                                    if (this.props.locationId !== work.locationId) return false;
                                }
                                return (
                                    <Link key={i} to={"/modlist/" + i} className="list-group-item list-group-item-action d-flex flex-nowrap justify-content-between py-2 pl-3 pr-0">
                                        <div className="d-flex flex-column align-items-start flex-nowrap">
                                            <div className="d-flex flex-row flex-nowrap">
                                                <p className="lead mb-1">{Moment(work.date, "Y-M-D").format("dd, D-M-Y")}</p>
                                                <p className="align-self-center ml-2 mb-0">{work.location}</p>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <div>
                                                    <div><strong>{Moment(work.start, "HH:mm:ss").format("HH:mm")}</strong></div>
                                                    <div><strong>{Moment(work.end, "HH:mm:ss").format("HH:mm")}</strong></div>
                                                </div>
                                                <div>
                                                    <p className="ml-3 mb-0 align-self-center">{work.course}</p>
                                                    <p className="ml-3 mb-0 align-self-center">{work.moderator}</p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="badge badge-pill badge-secondary mr-5 align-self-center">
                                            {work.registeredUsers.length}
                                        </div>
                                    </Link>
                                );
                            })
                        }

                    </div>
                </div>

            </div>
        );
    }
}

Agenda.propTypes = {
    actions: PropTypes.object.isRequired,
    work: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        work: state.work,
        locations: state.cache === null ? [] : state.cache.locations,
        locationId: state.agendaFilter.locationId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        loadCache: dispatch(cacheActions.loadCache()),
        changeFilter: locationId => dispatch(filterActions.filterLocation(locationId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Agenda);