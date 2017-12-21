import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const content = document.getElementById("content");
            if (content !== undefined && content !== null) {
                content.scrollTop = 0;
            }
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
