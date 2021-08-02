import React from "react";
import BaseComponent from "../baseComponent";
import Footer from "./footerComponent"
import Utils from '../../utility'
import { BlockService } from '../../services'


import TokenSearchComponent from "../explorer/tokensearchBar";


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