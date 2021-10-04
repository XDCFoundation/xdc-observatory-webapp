import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ResponsiveLine } from '@nivo/line';
import '../../assets/styles/custom.css';
import styled from "styled-components";
import Utils from '../../utility'
import TokenData from "../../services/token";
import moment from "moment";
const GraphSize = styled.div`
height: 8.75rem;
width: auto;
margin-top: 1rem;
@media (max-width:640px){
    height: 80px;
}
`


const toolTipElement = (props) => {
    console.log(props.point?.data?.x, "<<prop")
    console.log(props, "<<")
    return (
        <div>
            <div className="Tooltip-graph">
                <p className="Tooltip-graph-date">{props.point?.data?.x}</p>
                <p className="Tooltip-graph-tx">Holders: {props.point?.data?.y}</p>
            </div>

        </div>
    )
}
const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
        data={data}
        tooltip={toolTipElement}
        margin={{ top: 10 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
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
                translateY: 0,
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

export default function App() {
    const [data, setData] = useState([])
    const [graphTransactions, setGraphTransactions] = useState([]);
    console.log(graphTransactions, ":}")
    const { address } = useParams();
    useEffect(async () => {
        let urlPath = `${address}`;
        console.log(urlPath, "|||")
        let [error, transactionGraph] = await Utils.parseResponse(TokenData.getSomeDaysHolders(urlPath, {}))
        if (error || !transactionGraph)
            return
        setGraphTransactions(transactionGraph)
        console.log(transactionGraph, "tee")
        var arr = [{
            id: "Transaction",
            color: "hsl(248, 70%, 50%)",
            data: []
        }]


        var resultData = []
        transactionGraph.map(items => {
            let age = moment(items.date).format('D MMM YYYY')
            resultData.push({
                x: age,
                y: items.count
            })

        })


        arr[0].data = resultData
        setData(arr)
    }, [])


    let length = graphTransactions?.length;
    const firstDate = graphTransactions.length == 0 ? "" : (moment(graphTransactions[length - 1]?.date).format('D MMM'))
    const lastDate = graphTransactions.length == 0 ? "" : (moment(graphTransactions[0]?.date).format('D MMM'))
    return (
        <GraphSize >

            <MyResponsiveLine data={data} />
            <div className="dates">
                <p>{lastDate}</p>
                <p>{firstDate}</p>

            </div>

            {/* </div> */}
        </GraphSize>
    );
}

