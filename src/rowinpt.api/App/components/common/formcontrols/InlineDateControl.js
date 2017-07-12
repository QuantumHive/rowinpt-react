import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";

class InlineDateControl extends React.Component {

    constructor(props) {
        super(props);
        if (props.date === "" || props.date === undefined) {
            this.state = {
                day: "",
                month: "",
                year: ""
            };
        } else {
            const date = Moment(props.date);
            this.state = {
                day: date.date(),
                month: date.month() + 1,
                year: date.year()
            };
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        switch (name) {
            case "day":
            if (value === "") break;
            if (isNaN(value)) return;
            if (value < 1 || value > 31) return;
            break;
        case "year":
            if (value === "") break;
            if (isNaN(value)) return;
            if (value.length > 4) return;
            if (value < 0) return;
            break;
        }

        this.setState(prevState => {
            const newState = { ...prevState };
            newState[name] = value;
            return newState;
        }, () => {
            if (this.state.day !== "" && this.state.month !== "" && this.state.year !== "") {
                const date = Moment(`${this.state.day}-${this.state.month}-${this.state.year}`, "D-M-Y");
                this.props.handleChange(date.format());
            }
        });
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <div className="d-flex flex-row flex-nowrap">
                    <input className="form-control mr-2 col-3" required={this.props.required} type="number" placeholder="dag" name="day" value={this.state.day} onChange={this.handleChange} step="1" min="1" max="31" />
                    <select className="form-control col mr-2 custom-select" required={this.props.required} name="month" value={this.state.month} onChange={this.handleChange}>
                        <option value="" disabled="disabled" hidden="hidden">maand</option>
                        <option value="1">januari</option>
                        <option value="2">februari</option>
                        <option value="3">maart</option>
                        <option value="4">april</option>
                        <option value="5">mei</option>
                        <option value="6">juni</option>
                        <option value="7">juli</option>
                        <option value="8">augustus</option>
                        <option value="9">september</option>
                        <option value="10">oktober</option>
                        <option value="11">november</option>
                        <option value="12">december</option>
                    </select>
                    <input className="form-control col-3" required={this.props.required} type="number" placeholder="jaar" name="year" value={this.state.year} onChange={this.handleChange} step="1" min="0" max="9999" />
                </div>
            </div>
        );
    }
}

InlineDateControl.propTypes = {
    label: PropTypes.string.isRequired,
    date: PropTypes.string,
    handleChange: PropTypes.func.isRequired
};

export default InlineDateControl;