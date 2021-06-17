import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, redarrow, greenarrow } from '@material-ui/core';
import '../../assets/styles/custom.css';


const MarketDataChange = [
    { "key": "Market Cap", "value": "$82.69 B", "change": -10.47 },
    { "key": "Fully Diluted Market Cap", "value": "$261.69 B", "change": 10.47 },
    { "key": "Volume (24hr)", "value": "$5.28 B", "change": -13.69 }]
const MarketDataNoChange = [
    { "key": "Circulating Supply", "value": "12.27B XDC" },
    { "key": "Volume/Market Cap", "value": "0.006061" },
    { "key": "Total Supply", "value": "37,666,937,873" }
]

export default function marketDatatable() {

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
           
            <div  className="centerbox-1">

                <p  style={{backgroundColor: 'red'}} ></p>
                <div  className="main-form-container-2">
                <Grid  >

      <Grid container>
        {MarketDataChange.map(({ key, value, change }) => {
          return (
            <Grid  align="center" md={2}>
              <Grid className="TableHeaders">{key}</Grid>
              <Grid style={{marginTop: 7}} className="TableTexts">{value}</Grid>
              {
                change < 0 ?
                  <span className="XDCPriceDropText" style={{ color: "red" }}><img style={{width: '8px',height: '6px',margin: '6px 4px 5px 0'}} src={require("../../../src/assets/images/down-red.png")}></img> &nbsp;{change}%</span>
                  :
                  <span className="XDCPriceDropText" style={{ color: "green" }}><img style={{width: '8px',height: '6px',margin: '6px 4px 5px 0'}} src={require("../../../src/assets/images/up-green.png")}></img> &nbsp;{change}%</span>
              }
            </Grid>
          )
        })}
 
        {MarketDataNoChange.map(({ key, value }) => {
          return (
            <Grid  align="center" md={2}>
              <Box >
                <Grid className="TableHeaders">{key}</Grid>
                <Grid style={{marginTop: 7}} className="TableTexts">{value}</Grid>
              </Box>
            </Grid>
          )
        })}

      </Grid>
    </Grid>
                </div>
            </div>
           


        </div>

    );
}





