import React from 'react';

function CommandBar({ isEnabled }) {
    return (
        <div>
            {
                isEnabled ? (
                    <div className="fixed-bottom row bg-faded">
                        <div className="col">

                        </div>
                        <div className="col-6 text-center py-1">
                            <button type="button" className="btn btn-outline-primary btn-lg btn-block">Inplannen</button>
                        </div>
                        <div className="col">

                        </div>
                    </div>
                ) : (
                    <span></span>
                )
            }
        </div>);
}

export default CommandBar;