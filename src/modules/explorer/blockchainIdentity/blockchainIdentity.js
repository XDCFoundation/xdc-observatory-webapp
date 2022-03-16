import React, { useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/styles';
import Tokensearchbar from '../tokensearchBar';
import FooterComponent from '../../common/footerComponent'
import NetworkCard from './networkCard'
import { NetworkService } from '../../../services';

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
    contentRow: {
        marginTop: "12px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between"
    },
    
}))

export default function BlockchainIdentity() {
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
    <div>
        {console.log("hit",blockchainIdentityResponse)}
        <Tokensearchbar />
        <div className={classes.mainContainer}>
            <div className={classes.heading}>Blockchain Identity</div>
            <div className={classes.contentRow}>
                <NetworkCard
                    cardHeading={"XDC Mainnet"}
                    networkName={blockchainIdentityResponse[0]?.networkName}
                    RPC_URL={blockchainIdentityResponse[0]?.RPC_URL}
                    chainID={blockchainIdentityResponse[0]?.chainID}
                    currencySymbol={blockchainIdentityResponse[0]?.currencySymbol}
                    blockExplorer={blockchainIdentityResponse[0]?.blockExplorer}
                />
                <NetworkCard
                    cardHeading={"XDC Apothem Testnet"}
                    networkName={blockchainIdentityResponse[1]?.networkName}
                    RPC_URL={blockchainIdentityResponse[1]?.RPC_URL}
                    chainID={blockchainIdentityResponse[1]?.chainID}
                    currencySymbol={blockchainIdentityResponse[1]?.currencySymbol}
                    blockExplorer={blockchainIdentityResponse[1]?.blockExplorer}
                />
            </div>
            <div className={classes.contentRow}>    
                <NetworkCard 
                    cardHeading={"XDC Devnet"} 
                    networkName={blockchainIdentityResponse[3]?.networkName}
                    RPC_URL={blockchainIdentityResponse[3]?.RPC_URL}
                    chainID={blockchainIdentityResponse[3]?.chainID}
                    currencySymbol={blockchainIdentityResponse[3]?.currencySymbol}
                    blockExplorer={blockchainIdentityResponse[3]?.blockExplorer}
                />
                <NetworkCard
                    cardHeading={"XDC Testnet"}
                    networkName={blockchainIdentityResponse[2]?.networkName}
                    RPC_URL={blockchainIdentityResponse[2]?.RPC_URL}
                    chainID={blockchainIdentityResponse[2]?.chainID}
                    currencySymbol={blockchainIdentityResponse[2]?.currencySymbol}
                    blockExplorer={blockchainIdentityResponse[2]?.blockExplorer}
                />
            </div>
        </div>
        <FooterComponent />
    </div>
  )
}
