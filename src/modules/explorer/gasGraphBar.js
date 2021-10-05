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
                <p className="Tooltip-graph-tx">Gas Price(Gwei): {props.point?.data?.y}</p>
            </div>

        </div>
    )
}
const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
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
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
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
        const interval = setInterval(async () => {
            let [error, transactionGraph] = await Utils.parseResponse(TransactionService.getSomeDaysTransaction())
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
                y: (items.avgGasPrice / 1000000000000000000).toString().substr(0, 6)

            })


        })

        let graphdata = resultData
        graphdata.reverse()
        arr[0].data = resultData
        setData(arr)







    }, [])
    let length = graphTransactions.length;

    const firstDate = graphTransactions.length == 0 ? "" : (moment(graphTransactions[length - 1]?.day).format('D MMM'))
    const lastDate = graphTransactions.length == 0 ? "" : (moment(graphTransactions[0]?.day).format('D MMM'))
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

