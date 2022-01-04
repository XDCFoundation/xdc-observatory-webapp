import React from 'react';
import Graph from "../../../common/commonGraph"


function TokenBalanceGraphComponent(props) {

    const options = {
        title: {
            text: "",
        },
        series: [
            {
                data: props.state.graphData
            },
        ],
        yAxis:[{
            opposite: false,
            title:{text:"Token Balance"},
        }],
        xAxis:[{
            opposite: false,
            title:{text:""},
        }],
    };

    return (
        <div>
            <Graph options={options}/>
        </div>
    )
}

export default TokenBalanceGraphComponent;