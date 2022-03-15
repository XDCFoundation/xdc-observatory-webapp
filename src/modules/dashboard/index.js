import BaseComponent from "../baseComponent";
import React from "react";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import ContractComponent from "./contractComponent";

class Contract extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  

  render() {
    return (
      <>
        <div className={this.props.theme.currentTheme === "dark" ? "dark-theme-bg" : ""}>
          <ContractComponent theme={this.props.theme.currentTheme}/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {  theme: state.theme };
};
export default connect(mapStateToProps, { dispatchAction })(Contract);
