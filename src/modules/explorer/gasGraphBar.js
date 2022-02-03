import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line';
import '../../assets/styles/custom.css';
import moment from "moment";
import { TransactionService } from '../../services'
import Utils from '../../utility'
import styled from "styled-components";

const toolTipElement = (props) => {
    return (
        <div>
            <div className="Tooltip-graph">
                <p className="Tooltip-graph-date">{props.point?.data?.x}</p>
                <p className="Tooltip-graph-tx">Avg Transaction Fee(USD): {props.point?.data?.y}</p>
            </div>
            <div class="outer-oval-trans">
                <div class="Oval"></div>
            </div>

        </div>
    )
}
const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
    margin={{ left: 50, bottom: 5,top:5 }}
        data={data}
        tooltip={toolTipElement}

        // colors={{ scheme: "category10" }}
        xScale={{ type: "point" }}
        yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            orient: "left",
            tickSize: 0,
        tickPadding:5,
        
            tickValues: 3,
    
          }}
        enableGridX={false}
        enableGridY={false}
        // colors={{ scheme: 'purple_blue' }}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        enableCrosshair={false}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[]}
        theme={{ fontSize: 11, fontFamily: "Inter",textColor:"#9fa9ba" }}
    />
)
const GraphSize = styled.div`

height: 8.75rem;
width: auto;
margin-top: 3.19rem;

@media (max-width:767px){
    height: 80px;
}
`

export default function App() {

    const [data, setData] = useState([])

    const [graphTransactions, setGraphTransactions] = useState([]);

    useEffect(async () => {
        let [error, transactionGraph] = await Utils.parseResponse(TransactionService.getSomeDaysTransaction())
        if (error || !transactionGraph)
            return
        setGraphTransactions(transactionGraph)
        // alert(JSON.stringify(transactionGraph))
        setInterval(async () => {
            let [error, transactionGraph] = await Utils.parseResponse(TransactionService.getSomeDaysTransaction())
            if (error) return
            setGraphTransactions
                (transactionGraph);
            // alert(JSON.stringify(transactionGraph))
        }, 90000)

        var arr = [{
            id: "GasPrice",
            color: "hsl(248, 70%, 50%)",
            data: []
        }]

        var resultData = []

        transactionGraph.map(items => {


            resultData.push({
                x: items.day,
                y: Utils.decimalDivisonOnly(items?.avgGasPrice, 8)

            })


        })

        let graphdata = resultData
        graphdata.reverse()
        arr[0].data = resultData
        setData(arr)







    }, [])
    let length = graphTransactions ? graphTransactions?.length : "";

    const firstDate = graphTransactions && graphTransactions?.length === 0 ? "" : (moment(graphTransactions[length - 1]?.day).format('D MMM'))
    const lastDate = graphTransactions && graphTransactions?.length === 0 ? "" : (moment(graphTransactions[0]?.day).format('D MMM'))
    return (
        <GraphSize >

            <MyResponsiveLine data={data} />
            <div className="dates">
                <p>{firstDate}</p>
                <p>{lastDate}</p>
            </div>
        </GraphSize>
    );
}

