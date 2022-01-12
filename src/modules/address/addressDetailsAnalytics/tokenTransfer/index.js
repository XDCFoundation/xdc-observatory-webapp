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
    return <TokenTransferGraph address={addr}/>;
}

class TokenTransferGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        this.getTokenTransferData();
    }

    getTokenTransferData = async () => {
        const address = this.props.address;
        const request = {
            "address": address,
            "from": moment().subtract(2, "month").valueOf(),
            "to": moment().valueOf(),
            "type":"TOKEN_TRANSFER"
        }
        let [error, response] = await utility.parseResponse(accounts.getAddressAnalytics(request));
        if (error || !response) {
            this.generateGraphData([]);
            return;
        }
        this.generateGraphData(response);
    }

    generateGraphData = (data) => {
        const tokenTransfer = [];
        const tokenContractCount = [];
        const outBoundTransfer = [];
        const inBoundTransfer = [];
        const uniqueAddressSent = [];
        const uniqueAddressReceived = [];
        for (let index = 0; index < data.length; index++) {
            const x = data[index].addedOn;
            tokenTransfer.push({x, y: data[index].totalTransferTokens});
            tokenContractCount.push({x, y: data[index].transfersCount});
            outBoundTransfer.push({x, y: data[index].outBoundTransfers});
            inBoundTransfer.push({x, y: data[index].inBoundTransfers});
            uniqueAddressSent.push({x, y: data[index].uniqueSenders});
            uniqueAddressReceived.push({x, y: data[index].uniqueReceivers});
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
                    data: tokenTransfer,
                    color: "rgb(124, 181, 236)",
                    name: "Token Transfers"
                },
                {
                    data: tokenContractCount,
                    color: "rgb(67, 67, 72)",
                    name: "Token Contracts Count"
                },
                {
                    data: outBoundTransfer,
                    color: "rgb(144, 237, 125)",
                    name: "Outbound Transfers"
                },
                {
                    data: inBoundTransfer,
                    color: "rgb(247, 163, 92)",
                    name: "Inbound Transfers"
                },
                {
                    data: uniqueAddressSent,
                    color: "rgb(128, 133, 233)",
                    name: "Unique Address Sent"
                },
                {
                    data: uniqueAddressReceived,
                    color: "rgb(241, 92, 128)",
                    name: "Unique Address Received"
                }
            ],
            credits: {enabled: false},
            yAxis: [
                {
                    opposite: false,
                    title: {text: ""},
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
