import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line';
import '../../assets/styles/custom.css';
import moment from "moment";
import { AccountService } from '../../services'
import Utils from '../../utility'
import styled from "styled-components";
import format from "format-number";

const toolTipElement = (props) => {
    let accountCount = Number(props.point?.data?.y)
    return (
        <div>
            <div className="Tooltip-graph">
                <p className="Tooltip-graph-date">{props.point?.data?.x}</p>
                <p className="Tooltip-graph-tx">Accounts: {format({})(accountCount)}</p>
            </div>
            <div class="outer-oval-trans">
                <div class="Oval"></div>
            </div>
        </div>
    )
}
const MyResponsiveLine = ({ data }) => (
    <GraphSize >
        <ResponsiveLine
        margin={{ left: 50, bottom: 5,top:10 }}
            data={data}
            tooltip={toolTipElement}

            // colors={{ scheme: "yellow_orange_red" }}
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
                tickPadding: 5,
                tickValues: 3,
              }}
            enableGridX={false}
            enableGridY={false}
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
    </GraphSize>
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

    const [graphAccounts, setGraphAccounts] = useState([]);

    useEffect(async () => {
        let [error, AccountGraph] = await Utils.parseResponse(AccountService.getSomeDaysAccount())
        if (error || !AccountGraph)
            return
        setGraphAccounts(AccountGraph)
        // alert(JSON.stringify(AccountGraph))
        setInterval(async () => {
            let [error, AccountGraph] = await Utils.parseResponse(AccountService.getSomeDaysAccount())
            if (error) return;
            setGraphAccounts
                (AccountGraph);
            // alert(JSON.stringify(AccountGraph))
        }, 90000)

        var arr = [{
            id: "Accounts",
            color: "hsl(248, 70%, 50%)",
            data: []
        }];

        var resultData = []
        AccountGraph.map(items => {
            resultData.push({
                x: items.day,
                y: items.accountCount
            })
            return true;

            // moment(items.timestamp * 1000).format("MMMM Do YYYY"),moment(items.timestamp * 1000).format("MMMM Do YYYY"),

        })

        let graphdata = resultData
        graphdata.reverse()
        arr[0].data = resultData
        setData(arr)


    }, []);
    // var d = new Date();
    // var n = d.getFullYear();
    // let length = data[0]?.data.length;

    // let value1 = data[0]?.data[0]?.x
    // const colonIndex1 = value1?.indexOf(n);
    // const atIndex1 = value1?.indexOf("");
    // let firstDate = value1?.slice(atIndex1, colonIndex1);

    // let value2 = data[0]?.data[length - 1]?.x
    // const colonIndex2 = value2?.indexOf(n);
    // const atIndex2 = value2?.indexOf("");
    // let lastDate = value2?.slice(atIndex2, colonIndex2);
    let length = graphAccounts ? graphAccounts?.length : "";
    const firstDate = graphAccounts && graphAccounts?.length === 0 ? "" : (moment(graphAccounts[length - 1]?.day).format('D MMM'))
    const lastDate = graphAccounts && graphAccounts?.length === 0 ? "" : (moment(graphAccounts[0]?.day).format('D MMM'))

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


