import React from 'react';

function NewUser() {
    return (
        <form className="col p-3" autoComplete="off">
            <div className="form-group">
                <label htmlFor="first-name">Voornaam</label>
                <input className="form-control" type="text" id="first-name" required="required" />
            </div>
            <div className="form-group">
                <label htmlFor="last-name">Achternaam</label>
                <input className="form-control" type="text" id="last-name" required="required" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" required="required" />
            </div>
            <div className="form-group">
                <label htmlFor="mobile">Mobiel</label>
                <input className="form-control" type="tel" id="mobile" required="required" />
            </div>
            <div className="form-group">
                <label>Geboortedatum</label>
                <div className="d-flex flex-row flex-nowrap">
                    <input className="form-control mr-2 col-3" type="text" required="required" placeholder="dag" />
                    <select className="form-control col mr-2 custom-select" required="required">
                        <option value="" disabled="disabled" selected="selected" hidden="hidden">maand</option>
                        <option>januari</option>
                        <option>februari</option>
                        <option>maart</option>
                        <option>april</option>
                        <option>mei</option>
                        <option>juni</option>
                        <option>juli</option>
                        <option>augustus</option>
                        <option>september</option>
                        <option>oktober</option>
                        <option>november</option>
                        <option>december</option>
                    </select>
                    <input className="form-control col-3" type="text" required="required" placeholder="jaar" />
                </div>
            </div>

            <fieldset className="form-group">
                <legend className="col-form-legend">Geslacht</legend>
                <label className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" name="sex" required="required" />
                    <span className="custom-control-indicator" />
                    <span className="custom-control-description">Man</span>
                </label>


                <label className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" name="sex" required="required" />
                    <span className="custom-control-indicator" />
                    <span className="custom-control-description">Vrouw</span>
                </label>
            </fieldset>

            <div className="form-group">
                <label htmlFor="subscription">Abonnement</label>
                <select className="custom-select form-control" id="subscription" required="required">
                    <option value="" disabled="disabled" selected="selected" hidden="hidden">kies</option>
                    <optgroup label="Begeleid sporten">
                        <option>1 x per week</option>
                        <option>2 x per week</option>
                        <option>3 x per week</option>
                    </optgroup>
                    <optgroup label="Small group training">
                        <option>1 x per week</option>
                        <option>2 x per week</option>
                        <option>3 x per week</option>
                    </optgroup>
                    <optgroup label="Groepslessen">
                        <option>1 x per week</option>
                        <option disabled="disabled">2 x per week</option>
                        <option>onbeperkt</option>
                    </optgroup>
                </select>
            </div>

            <button type="submit" className="btn btn-outline-success btn-block btn-lg mt-4">Aanmaken</button>
        </form>
    );
}

export default NewUser;