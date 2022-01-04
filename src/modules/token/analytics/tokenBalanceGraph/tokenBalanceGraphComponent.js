import React from 'react';
import Graph from "../../../common/commonGraph"


function TokenBalanceGraphComponent(props) {

    const options = {
        title: {
            text: "",
        },
        credits:{
            enabled: false
        },
        series: [
            {
                data: props.state.graphData,
                name: 'Token Balance',
                type:'column'
            },
        ],
        yAxis:[{
            opposite: false,
            title:{text:"Token Balance"},
        }],
        xAxis:[{
            opposite: false,
            title:{text:"<div>Hey</div>"},
        }],
    };

    return (
        <div>
            <Graph options={options}/>
        </div>
    )
}

export default TokenBalanceGraphComponent;