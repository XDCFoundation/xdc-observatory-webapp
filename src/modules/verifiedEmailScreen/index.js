import React from "react";
import BaseComponent from '../baseComponent'
import VerifiedEmailScreenComponent from './verifiedEmailScreen'
import TokenSearchComponent from "../explorer/tokensearchBar";
import FooterComponent from "../common/footerComponent";


class VerifiedEmailScreen extends BaseComponent {
    
    render() {
        return (
            <div>
            <TokenSearchComponent />
            <VerifiedEmailScreenComponent  state={this.state} />
            <FooterComponent />
            </div>
        );
    }
}

export default VerifiedEmailScreen;