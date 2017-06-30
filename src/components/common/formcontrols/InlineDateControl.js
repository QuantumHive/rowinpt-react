import React from 'react';
import PropTypes from 'prop-types';

function InlineDateControl(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <div className="d-flex flex-row flex-nowrap">
                <input className="form-control mr-2 col-3" type="number" required="required" placeholder="dag" name="birthdateDay" value={props.day} onChange={props.handleChange} step="1" min="1" max="31" />
                <select className="form-control col mr-2 custom-select" required="required" name="birthdateMonth" value={props.month} onChange={props.handleChange}>
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
                <input className="form-control col-3" type="number" required="required" placeholder="jaar" name="birthdateYear" value={props.year} onChange={props.handleChange} step="1" min="0" max="9999" />
            </div>
        </div>
    );
}

InlineDateControl.propTypes = {
    label: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default InlineDateControl;