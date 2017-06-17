import React from 'react';
import { Link } from 'react-router';
import * as paths from '../../constants/routePaths';

function Confirm(){
    return (
        <div className="col text-center pt-3">
            <h2>Samenvatting</h2>
            <table className="table">
                <tbody>
                    <tr><td>Arnhem</td></tr>
                    <tr><td>Groepsles</td></tr>
                    <tr><td>Maandag 27 juni 2017</td></tr>
                    <tr><td>Bootcamp</td></tr>
                </tbody>
            </table>

            <Link href={paths.default} role="button" className="btn btn-outline-success btn-lg btn-block">Aanmelden</Link>
        </div>
    );
}

export default Confirm;