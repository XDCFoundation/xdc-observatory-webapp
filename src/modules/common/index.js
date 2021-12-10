import React from "react";
import BaseComponent from "../baseComponent";
import Footer from "./footerComponent"



export default class FooterComponent extends BaseComponent {



    render() {
        return (
            <div>

                <Footer
                    _handleChange={this.props._handleChange}
                />

            </div>
        )

    }
}