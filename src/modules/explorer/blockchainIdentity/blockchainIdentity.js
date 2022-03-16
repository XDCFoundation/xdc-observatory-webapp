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
        justifyContent: "space-between",
        flexFlow: "wrap",
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
        <Tokensearchbar />
        <div className={classes.mainContainer}>
            <div className={classes.heading}>Blockchain Identity</div>
            <div className={classes.contentRow}>
            {blockchainIdentityResponse && blockchainIdentityResponse.map((row, index) => {
                return (<NetworkCard
                    cardHeading={row.networkName}
                    networkName={row.networkName}
                    RPC_URL={row.RPC_URL}
                    chainID={row.chainID}
                    currencySymbol={row.currencySymbol}
                    blockExplorer={row.blockExplorer}
                />)
                })}
            </div>
        </div>
        <FooterComponent />
    </div>
  )
}
