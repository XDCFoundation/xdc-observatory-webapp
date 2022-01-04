import React from 'react';
import Graph from "../../../common/commonGraph"

const options = {
    title: {
        text: "My stock chart",
    },
    series: [
        {
            data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9, 15],
        },
    ],
};

function TokenBalanceGraphComponent(props) {
    return (
        <div>
            <Graph options={options}/>
        </div>
    )
}

export default TokenBalanceGraphComponent;