import React from "react";
import { ResponsiveLine } from '@nivo/line';
// import { IoTriangleSharp } from 'react-icons/io'
import '../../assets/styles/custom.css';
import styled from "styled-components";

const GraphSize = styled.div`
height: 8.75rem;
width: auto;
margin-top: 1rem;
@media (max-width:767px){
    height: 102px;
    
}
@media (min-width:767px) and (max-width:1240px){
    margin-top: 2rem;
}
`

const data = [
    {
        "id": "japan",
        "color": "hsl(262, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 137
            },
            {
                "x": "helicopter",
                "y": 31
            }
        ]
    }
]
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



    return (
        <GraphSize >
            {/* <div style={{ height: 120, width: 390 }}> */}
            <MyResponsiveLine data={data} />
            <div className="dates">
                <p>5 Aug</p>
                <p>19 Aug</p>
            </div>

            {/* </div> */}
        </GraphSize>
    );
}

