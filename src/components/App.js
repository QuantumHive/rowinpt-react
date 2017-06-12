import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './common/Navigation';
import CommandBar from './common/CommandBar';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommandBarEnabled: props.location.pathname !== "/profile"
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.pathname !== nextProps.location.pathname){
            this.setCommandBar(nextProps);
        }
    }

    componentWillUpdate(nextProps, nextState){
        document.body.classList.remove("command-bar");
        if(nextState.isCommandBarEnabled){
            document.body.classList.add("command-bar");
        }
    }

    setCommandBar(nextProps) {
        this.setState(() => {
            return {
                isCommandBarEnabled: nextProps.location.pathname !== "/profile"
            };
        });
    }

    render() {
        window.console.log("app-render: " + this.state.isCommandBarEnabled);
        return (
            <div>
                <Navigation />

                <div className="container-fluid p-0">
                    {this.props.children}
                </div>

                <CommandBar isEnabled={this.state.isCommandBarEnabled} />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object
};

export default App;