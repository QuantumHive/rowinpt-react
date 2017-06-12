import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './common/Navigation';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                
                <div className="container-fluid p-0">
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;