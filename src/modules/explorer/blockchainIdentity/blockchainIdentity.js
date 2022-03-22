import React, { useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/styles';
import Tokensearchbar from '../tokensearchBar';
import FooterComponent from '../../common/footerComponent'
import NetworkCard from './networkCard'
import { NetworkService } from '../../../services';
import { dispatchAction } from "../../../utility";
import { connect } from "react-redux";

const useStyles = makeStyles((themes) => ({
    mainContainer: {
        maxWidth: "1202px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    heading: {
        marginTop: "46px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#2a2a2a",
    },
    darkheading: {
        marginTop: "46px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#ffffff",
    },
    contentRow: {
        marginTop: "12px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexFlow: "wrap",
    },
    
}))

function BlockchainIdentity(props) {
    console.log("blockchain-identity-props",props)
    const classes = useStyles();
    const [blockchainIdentityResponse, setBlockchainIdentityResponse] = useState([])

    useEffect(() => {
        networkDetails();
      }, []);

      async function networkDetails() {
        const response = await NetworkService.getNetworkDetails();
        setBlockchainIdentityResponse(response)
      }
  return (
    <div style={props?.theme.currentTheme === "dark" ? {backgroundColor: "#091b4e"} : { backgroundColor: "#fff" }} className={props?.theme.currentTheme === "dark" ? "dark-theme-bg" : ""}>
        <Tokensearchbar theme={props.theme.currentTheme === "dark" ? "dark" : ""} />
        <div className={classes.mainContainer}>
            <div className={props?.theme.currentTheme === "dark" ? classes.darkheading : classes.heading}>Blockchain Identity</div>
            <div className={classes.contentRow}>
            {blockchainIdentityResponse && blockchainIdentityResponse.map((row, index) => {
                return (<NetworkCard
                    cardHeading={row.networkName}
                    networkName={row.networkName}
                    RPC_URL={row.RPC_URL}
                    chainID={row.chainID}
                    currencySymbol={row.currencySymbol}
                    blockExplorer={row.blockExplorer}
                    theme={props?.theme.currentTheme}
                />)
                })}
            </div>
        </div>
        <FooterComponent />
    </div>
  )
}

const mapStateToProps = (state) => {
    return { user: state.user, theme: state.theme };
  };
  export default connect(mapStateToProps, { dispatchAction })(BlockchainIdentity);