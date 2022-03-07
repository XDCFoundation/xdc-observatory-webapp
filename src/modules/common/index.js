import React from "react";
import BaseComponent from "../baseComponent";
import Footer from "./footerComponent"
import { connect } from "react-redux";
import { dispatchAction } from "../../utility";
import { eventConstants } from "../../constants"



class FooterComponent extends BaseComponent {

    handleThemeSwitch = () => {
        this.props.dispatchAction(eventConstants.TOGGLE_THEME, this.props.theme.currentTheme === "dark" ? "light" : "dark")
    }


    render() {
        return (
            <div>

                <Footer
                    _handleChange={this.props._handleChange}
                    handleThemeSwitch={this.handleThemeSwitch}
                />

            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return { theme: state.theme };
};

export default connect(mapStateToProps, { dispatchAction })(FooterComponent);