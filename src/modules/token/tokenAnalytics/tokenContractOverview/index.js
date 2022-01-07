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
    const {address, tn} = useParams();
    return <TokenContractOverviewGraph address={address} tokenName={tn}/>;
}

class TokenContractOverviewGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        this.getTokenContractOverviewData();
    }

    getTokenContractOverviewData = async () => {
        const tokenAddress = this.props.address;
        let request = {
            tokenAddress: tokenAddress,
            startTime: moment().subtract(2, "month").valueOf(),
            endTime: moment().valueOf(),
        };
        let [error, response] = await utility.parseResponse(
            accounts.getTokenOverview(request)
        );
        if (error || !response) {
            this.generateGraphData([]);
            return;
        }
        this.generateGraphData(response);
    }

    generateGraphData = (data) => {
        // const data = [{
        //     "addedOn" : 1641340800000,
        //     "tokenAddress" : "xdc5d5f074837f5d4618b3916ba74de1bf9662a3fed",
        //     "receivedAmount" : 3.167390397506848e+23,
        //     "sentAmount" : 0,
        //     "totalTransferTokens" : 3.167390397506848e+23,
        //     "transactionCount" : 119,
        //     "uniqueAddress" : 48,
        //     "uniqueReceivers" : 0,
        //     "uniqueSenders" : 582
        // },
        //     {
        //         "addedOn" : 1641487232000,
        //         "tokenAddress" : "xdc5d5f074837f5d4618b3916ba74de1bf9662a3fed",
        //         "receivedAmount" : 4.167390397506848e+23,
        //         "sentAmount" : 1000,
        //         "totalTransferTokens" : 3.167390397506848e+23,
        //         "transactionCount" : 150,
        //         "uniqueAddress" : 70,
        //         "uniqueReceivers" : 0,
        //         "uniqueSenders" : 582
        //     }]
        const TransferAmount = [];
        const TransferCount = [];
        const UniqueAddress = [];
        const UniqueSender = [];
        const UniqueReceiver = [];
        for (let index = 0; index < data.length; index++) {
            const x = data[index].date;
            TransferAmount.push({x, y: data[index].sentAmount + data[index].receivedAmount});
            TransferCount.push({x, y: data[index].transactionCount});
            UniqueAddress.push({x, y: data[index].uniqueAddress});
            UniqueSender.push({x, y: data[index].uniqueSenders });
            UniqueReceiver.push({x, y: data[index].uniqueReceivers });
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
                enabled: false,
            },
            exporting: {
                buttons: {
                    contextButton: {
                        text: "Export",
                        enabled: true
                    }
                },
                enabled: true,
            },
            tooltip: {
                split: false
            },
            series: [
                {
                    data: TransferAmount,
                    color: "rgb(124, 181, 236)",
                    name: "Transfer Amount"
                },
                {
                    data: TransferCount,
                    color: "rgb(67, 67, 72)",
                    name: "Transfers Count"
                },
                {
                    data: UniqueReceiver,
                    color: "rgb(144, 237, 125)",
                    name: "Unique Receivers"
                },
                {
                    data: UniqueSender,
                    color: "rgb(247, 163, 92)",
                    name: "Unique Senders"
                },
                {
                    data: UniqueAddress,
                    color: "rgb(128, 133, 233)",
                    name: "Total Uniques"
                }
            ],
            credits: {enabled: false},
            yAxis: [
                {
                    opposite: false,
                    title: {text: "Amount"},
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
