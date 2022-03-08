import React from "react";
import BaseComponent from "../baseComponent";
import Footer from "./footerComponent"
import { connect } from "react-redux";
import { dispatchAction } from "../../utility";
import { eventConstants } from "../../constants"



class FooterComponent extends BaseComponent {

    render() {
        return (
            <div>

                <Footer
                    _handleChange={this.props._handleChange}
                    theme={this.props.theme.currentTheme}
                />

            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return { theme: state.theme };
};

export default connect(mapStateToProps, { dispatchAction })(FooterComponent);