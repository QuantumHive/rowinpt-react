import React from 'react';
import PropTypes from 'prop-types';

function UserForm(props){
    return (
            <form className="col p-3" autoComplete="off" onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first-name">Voornaam</label>
                    <input className="form-control" type="text" id="first-name" required="required" name="firstName" value={props.user.firstName} onChange={props.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Achternaam</label>
                    <input className="form-control" type="text" id="last-name" required="required" name="lastName" value={props.user.lastName} onChange={props.handleChange} />
                </div>
                {props.user.email ?
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" required="required" name="email" value={props.user.email} onChange={props.handleChange} />
                </div> : false }
                <div className="form-group">
                    <label htmlFor="mobile">Mobiel</label>
                    <input className="form-control" type="tel" id="mobile" required="required" name="mobile" value={props.user.mobile} onChange={props.handleChange} />
                </div>
                {props.user.birthdateDay !== undefined ?
                <div className="form-group">
                    <label>Geboortedatum</label>
                    <div className="d-flex flex-row flex-nowrap">
                        <input className="form-control mr-2 col-3" type="number" required="required" placeholder="dag" name="birthdateDay" value={props.user.birthdateDay} onChange={props.handleChange} step="1" min="1" max="31" />
                        <select className="form-control col mr-2 custom-select" required="required" name="birthdateMonth" value={props.user.userbirthdateMonth} onChange={props.handleChange}>
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
                        <input className="form-control col-3" type="number" required="required" placeholder="jaar" name="birthdateYear" value={props.user.birthdateYear} onChange={props.handleChange} step="1" min="0" max="9999" />
                    </div>
                </div> : false }

                {props.user.male !== undefined ?
                <fieldset className="form-group">
                    <legend className="col-form-legend">Geslacht</legend>
                    <label className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" value="male" name="sex" required="required" checked={props.user.male} onChange={props.handleChange} />
                        <span className="custom-control-indicator" />
                        <span className="custom-control-description">Man</span>
                    </label>


                    <label className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" value="female" name="sex" required="required" checked={props.user.female} onChange={props.handleChange} />
                        <span className="custom-control-indicator" />
                        <span className="custom-control-description">Vrouw</span>
                    </label>
                </fieldset> : false }

                <fieldset className="form-group">
                    <legend>Abonnementen</legend>
                    <label htmlFor="attended-training-subscription">Begeleid sporten</label>
                    <select className="custom-select form-control" id="attended-training-subscription" name="attendedTrainingSubscription" value={props.user.attendedTrainingSubscription} onChange={props.handleChange}>
                        <option value="">geen</option>
                        <option value="1">1 x per week</option>
                        <option value="2">2 x per week</option>
                        <option value="3">3 x per week</option>
                    </select>
                    <label htmlFor="small-group-subscription">Small group</label>
                    <select className="custom-select form-control" id="small-group-subscription" name="smallGroupSubscription" value={props.user.smallGroupSubscription} onChange={props.handleChange}>
                        <option value="">geen</option>
                        <option value="1">1 x per week</option>
                        <option value="2">2 x per week</option>
                        <option value="3">3 x per week</option>
                    </select>
                    <label htmlFor="group-training-subscription">Begeleid sporten</label>
                    <select className="custom-select form-control" id="group-training-subscription" name="groupTrainingSubscription" value={props.user.groupTrainingSubscription} onChange={props.handleChange}>
                        <option value="">geen</option>
                        <option value="1">1 x per week</option>
                        <option disabled="disabled">2 x per week</option>
                        <option value="0">onbeperkt</option>
                    </select>
                </fieldset>

                <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4">Aanmaken</button>
            </form>
        );
}

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default UserForm;