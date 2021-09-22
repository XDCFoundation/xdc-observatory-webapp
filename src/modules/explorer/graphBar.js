import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line';
import '../../assets/styles/custom.css';
import moment from "moment";
import { TransactionService } from '../../services'
import Utils from '../../utility'
import styled from "styled-components";

const toolTipElement = (props) => {
    console.log(props, "<<prop")
    console.log(props, "<<")
    return (
        <div>
            <div className="Tooltip-graph">
                <p className="Tooltip-graph-date">{props.point?.data?.x}</p>
                <p className="Tooltip-graph-tx">Transactions: {props.point?.data?.y}</p>
            </div>
            {/* <TriangleArrowDown /> */}
        </div>
    )
}
const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
        data={data}
        // colors={{ scheme: "yellow_orange_brown" }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        curve="basis"
        axisTop={null}
        axisRight={null}
        tooltip={toolTipElement}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transaction',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        enableCrosshair={false}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 100,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
const GraphSize =styled.div`
height: 7.56rem;
width: auto;
margin-top: 3.19rem;
@media (max-width:640px){
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
            id: "Transaction",
            color: "hsl(248, 70%, 50%)",
            data: []
        }]


        var resultData = []
        transactionGraph.map(items => {

            resultData.push({
                x: items.day,
                y: items.transactionCount
            })

        })

        let graphdata = resultData
        graphdata.reverse()
        arr[0].data = resultData
        setData(arr)
    }, [])
    var d = new Date();
    var n = d.getFullYear();
    let length = data[0]?.data.length;

    let value1 = data[0]?.data[0]?.x
    const colonIndex1 = value1?.indexOf(n);
    const atIndex1 = value1?.indexOf("");
    let firstDate = value1?.slice(atIndex1, colonIndex1);

    let value2 = data[0]?.data[length - 1]?.x
    const colonIndex2 = value2?.indexOf(n);
    const atIndex2 = value2?.indexOf("");
    let lastDate = value2?.slice(atIndex2, colonIndex2);

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

