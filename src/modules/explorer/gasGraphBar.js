import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line';
import '../../assets/styles/custom.css';
import moment from "moment";
import {  TransactionService } from '../../services'
import Utils from '../../utility'


const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
        data={data}

        margin={{top: 10}}
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
        }, 30000)
    
        var arr = [{
            id: "GasPrice",
            color: "hsl(248, 70%, 50%)",
            data: []
        }]

        var resultData = []

        transactionGraph.map(items => {

            if (resultData.length > 0) {
                if (checkDuplicate(moment(items.timestamp * 1000).format("MMMM Do YYYY"),items.gasPrice)) {
                    resultData.push({
                        x: moment(items.timestamp * 1000).format("MMMM Do YYYY"),
                        y: parseInt(items.gasPrice)
                    })
                }
            }
            else {
                resultData.push({
                    x: moment(items.timestamp * 1000).format("MMMM Do YYYY"),
                    y: parseInt(items.gasPrice)
                })
            }

        })

        function checkDuplicate(id,gasPrice) {
            for (let index = 0; index < resultData.length; index++) {
                if (id === resultData[index].x) {
                    resultData[index].y += parseInt(gasPrice)
                    return false;
                }
            }
            return true;
        }

        let graphdata = resultData
        arr[0].data=resultData
        setData(arr)

   

    // .catch(err => {
    //     console.log(err);
    // })
   

    
    }, [])

    return (
        <div style={{ height: 120, width: 370}}>
            <MyResponsiveLine data={data} />
        </div>
    );
}

                       