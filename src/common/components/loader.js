import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from "react-redux";
import { dispatchAction } from '../../utility';

const LoaderComponent = (props) => {
    let topValue = props.top ? props.top : "30px" ;
    let marginValue = props.user && props.user.loaderMargin ? props.user.loaderMargin : '50%';
    return (
        <div style={{position: 'absolute', width: '100%', height: '100%', top: topValue, zIndex: 100000}}>
            <CircularProgress
                size={40}
                left={-20}
                top={10}
                status="loading"
                style={{
                    marginLeft: marginValue,
                }}
            />
         </div>
        );
};

const mapStateToProps = (state) => {
    return { user: state.user };
  };
  export default connect(mapStateToProps, { dispatchAction })(LoaderComponent);
