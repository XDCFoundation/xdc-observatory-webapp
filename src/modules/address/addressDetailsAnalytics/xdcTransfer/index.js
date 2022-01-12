import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import BaseComponent from "../../../baseComponent";
import utility from "../../../../utility";
import accounts from "../../../../services/accounts";
import {useParams} from "react-router-dom";
import moment from "moment";

const GraphContainer = styled.div`
  margin: 45px 0 0 0;
`;

export default function WrappedComponent() {
    const {addr} = useParams();
    return <XDCTransferGraph address={addr}/>;
}

class XDCTransferGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        this.generateGraphData();
    }

    // getTokenContractOverviewData = async () => {
    //     const tokenAddress = this.props.address;
    //     let request = {
    //         tokenAddress: tokenAddress,
    //         startTime: moment().subtract(2, "month").valueOf(),
    //         endTime: moment().valueOf(),
    //     };
    //     let [error, response] = await utility.parseResponse(
    //         accounts.getTokenOverview(request)
    //     );
    //     if (error || !response) {
    //         this.generateGraphData([]);
    //         return;
    //     }
    //     this.generateGraphData(response);
    // }

    generateGraphData = () => {
        const data = [
            {
                "transfersCount": 306,
                "sentAmount": 14457900000000,
                "receivedAmount": 0,
                "inBoundTransfers": 0,
                "outBoundTransfers": 306,
                "contracts": [
                    {
                        "contract": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
                        "sentAmount": 0,
                        "recievedAmount": 100000000
                    }
                ],
                "totalTransferTokens": 14457900000000,
                "uniqueSenders": 0,
                "uniqueReceivers": 299,
                "uniqueAddress": 299,
                "addedOn": 1640975400000
            },
            {
                "transfersCount": 326,
                "sentAmount": 10400700000000,
                "receivedAmount": 0,
                "inBoundTransfers": 0,
                "outBoundTransfers": 326,
                "contracts": [
                    {
                        "contract": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
                        "sentAmount": 0,
                        "recievedAmount": 100000000
                    }
                ],
                "totalTransferTokens": 10400700000000,
                "uniqueSenders": 0,
                "uniqueReceivers": 322,
                "uniqueAddress": 322,
                "addedOn": 1641061800000
            },
            {
                "transfersCount": 302,
                "sentAmount": 12707900000000,
                "receivedAmount": 0,
                "inBoundTransfers": 0,
                "outBoundTransfers": 302,
                "contracts": [
                    {
                        "contract": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
                        "sentAmount": 0,
                        "recievedAmount": 100000000
                    }
                ],
                "totalTransferTokens": 12707900000000,
                "uniqueSenders": 0,
                "uniqueReceivers": 295,
                "uniqueAddress": 295,
                "addedOn": 1641148200000
            },
            {
                "transfersCount": 309,
                "sentAmount": 10948900000000,
                "receivedAmount": 0,
                "inBoundTransfers": 0,
                "outBoundTransfers": 309,
                "contracts": [
                    {
                        "contract": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
                        "sentAmount": 0,
                        "recievedAmount": 100000000
                    }
                ],
                "totalTransferTokens": 10948900000000,
                "uniqueSenders": 0,
                "uniqueReceivers": 288,
                "uniqueAddress": 288,
                "addedOn": 1641234600000
            },
            {
                "transfersCount": 274,
                "sentAmount": 10315500000000,
                "receivedAmount": 0,
                "inBoundTransfers": 0,
                "outBoundTransfers": 274,
                "contracts": [
                    {
                        "contract": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
                        "sentAmount": 0,
                        "recievedAmount": 100000000
                    }
                ],
                "totalTransferTokens": 10315500000000,
                "uniqueSenders": 0,
                "uniqueReceivers": 271,
                "uniqueAddress": 271,
                "addedOn": 1641321000000
            },
            {
                "transfersCount": 243,
                "sentAmount": 12582000000000,
                "receivedAmount": 0,
                "inBoundTransfers": 0,
                "outBoundTransfers": 243,
                "contracts": [
                    {
                        "contract": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
                        "sentAmount": 0,
                        "recievedAmount": 100000000
                    }
                ],
                "totalTransferTokens": 12582000000000,
                "uniqueSenders": 0,
                "uniqueReceivers": 238,
                "uniqueAddress": 238,
                "addedOn": 1641407400000
            }
        ];
        const sentAmount = [];
        const receiveAmount = [];
        for (let index = 0; index < data.length; index++) {
            const x = data[index].addedOn;
            sentAmount.push({x, y: data[index].sentAmount});
            receiveAmount.push({x, y: data[index].receivedAmount});
        }


        let options = {
            title: {
                text: "",
            },
            chart: {
                type: "line",
                zoomType: {
                    enabled: false
                }
            },
            legend: {
                layout: "horizontal",
                align: "center",
                enabled: true,
            },
            navigator: {
                enabled: false,
            },
            rangeSelector: {
                enabled: true,
            },
            tooltip: {
                split: false,
                shared: true
            },
            series: [
                {
                    data: sentAmount,
                    color: "rgb(124, 181, 236)",
                    name: "Sent (Out)"
                },
                {
                    data: receiveAmount,
                    color: "rgb(67, 67, 72)",
                    name: "Receive (In)"
                }
            ],
            credits: {enabled: false},
            yAxis: [
                {
                    opposite: false,
                    title: {text: "Transfer Amounts"},
                },
            ],
            xAxis: [
                {
                    showInLegend: false,
                    opposite: false,
                    title: {text: ""},
                },
            ],
        };
        this.setState({options});
    }


    render() {
        return (
            <GraphContainer>
                <Graph options={this.state.options}/>
            </GraphContainer>
        );
    }
}
