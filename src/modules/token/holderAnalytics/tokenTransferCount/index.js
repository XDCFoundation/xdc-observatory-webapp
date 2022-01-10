import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import BaseComponent from "../../../baseComponent";
import TokenListComponent from "../../../tokenList/tokenList";
import utility from "../../../../utility";
import accounts from "../../../../services/accounts";
import {useParams} from "react-router-dom";
import moment from "moment";

const GraphContainer = styled.div`
  margin: 20px 0 0 0;
`;

export default function WrappedComponent(props) {
    const {addr} = useParams();
    return <TokenTransferCountGraph address={addr} contractAddress={props.contractAddress}/>;
}

class TokenTransferCountGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            options: {}
        }
    }


    componentDidMount = () => {
        this.getTokenTransfer();
    }


    async getTokenTransfer() {;
        const userAddress = this.props.address;
        const tokenAddress = this.props.contractAddress;
        let request = {
            walletAddress: userAddress,
            tokenAddress: tokenAddress,
            from: moment().subtract(2, "month").valueOf(),
            to: moment().valueOf(),
        };
        let [error, response] = await utility.parseResponse(
            accounts.getTokenTransferCount(request)
        );
        if (error || !response) {
            this.generateGraphData([]);
            return;
        }
        this.generateGraphData(response);
    }

    generateGraphData(data) {
        const totalTransferData = [];
        const inBoundData = [];
        const outBoundData = [];
        const uniqueAddressSent = [];
        const uniqueAddressReceived = [];
        for (let index = 0; index < data.length; index++) {
            const x = data[index].date;
            totalTransferData.push({x, y: data[index].totalTransfers,});
            inBoundData.push({x, y: data[index].inBoundTransfer});
            outBoundData.push({x, y: data[index].outBoundTransfer,});
            uniqueAddressSent.push({
                x,
                y: data[index].uniqueAddressesSent,
            });
            uniqueAddressReceived.push({
                x,
                y: data[index].uniqueAddressesReceived,
            });
        }
        let options = {
            title: {
                text: "",
            },
            chart: {
                type: "line",
            },
            legend: {
                layout: "horizontal",
                align: "center",
                enabled: true,
            },
            tooltip: {
                split: false,
            },
            series: [
                {
                    data: totalTransferData,
                    type: "column",
                    color: "rgb(124, 181, 236)",
                    name: "Total Transfers",
                },
                {
                    data: outBoundData,
                    type: "line",
                    color: "rgb(67, 67, 72)",
                    name: "Outbound Transfers Counts",
                },
                {
                    data: inBoundData,
                    type: "line",
                    color: "rgb(144, 237, 125)",
                    name: "Inbound Transfers Counts",
                },
                {
                    data: uniqueAddressSent,
                    type: "line",
                    color: "rgb(247, 163, 92)",
                    name: "Unique Address Sent",
                },
                {
                    data: uniqueAddressReceived,
                    type: "line",
                    color: "rgb(128, 133, 233)",
                    name: "Unique Address Received",
                },
            ],
            credits: {enabled: false},
            yAxis: [
                {
                    opposite: false,
                    title: {text: "Transfer Counts"},
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
