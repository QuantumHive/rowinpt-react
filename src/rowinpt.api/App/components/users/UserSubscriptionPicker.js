import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class UserSubscriptionPicker extends React.Component {
    constructor(props) {
        super(props);

        const subscriptions =
            props.courseTypes.map(courseType => {
                return {
                    courseTypeId: courseType.id,
                    subscriptionId: ""
                };
            });

        if (props.selectedSubscriptions !== undefined) {
            for (let subscriptionId of props.selectedSubscriptions) {
                const courseTypeId = _.find(props.subscriptions, { id: subscriptionId }).courseTypeId;
                _.find(subscriptions, { courseTypeId: courseTypeId }).subscriptionId = subscriptionId;
            }
        }

        this.state = {
            subscriptions: subscriptions
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const courseTypeId = target.getAttribute('data-courseTypeId');
        const value = target.value;

        const newState = { ...this.state };
        _.find(newState.subscriptions, { courseTypeId: Number(courseTypeId) }).subscriptionId = value;
        const subscriptions = _.filter(newState.subscriptions, subscription => subscription.subscriptionId !== "").map(subscription => subscription.subscriptionId);

        this.setState(() => newState);

        this.props.handleChange(subscriptions);
    }

    render() {
        return (
            <fieldset className="form-group">
                <legend>Abonnementen</legend>

                {this.props.courseTypes.map(courseType => {
                    return (
                        <div key={courseType.id}>
                            <label htmlFor={`coursetype-${courseType.id}`}>{courseType.name}</label>
                            <select className="custom-select form-control" id={`coursetype-${courseType.id}`}
                                name="subscription" value={_.find(this.state.subscriptions, { courseTypeId: courseType.id }).subscriptionId}
                                onChange={this.handleChange} data-courseTypeId={courseType.id}>

                                <option value="">geen</option>
                                {_.sortBy(_.filter(this.props.subscriptions, subscription => subscription.courseTypeId === courseType.id), ['type']).map(subscription => {
                                    const option = subscription.type === 0 ? "onbeperkt" : `${subscription.type} x per week`;
                                    return (
                                        <option value={subscription.id} key={subscription.id} >{option}</option>
                                    );
                                })}

                            </select>
                        </div>
                    );
                })}
            </fieldset>
        );
    }
}

UserSubscriptionPicker.propTypes = {
    courseTypes: PropTypes.array.isRequired,
    subscriptions: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    selectedSubscriptions: PropTypes.array
};

export default UserSubscriptionPicker;