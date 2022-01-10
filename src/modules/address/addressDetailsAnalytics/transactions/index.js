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
    return <TransactionGraph address={addr}/>;
}

class TransactionGraph extends BaseComponent {
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
                "date": 1640975400000,
                "sentAmount": 0,
                "receivedAmount": 0,
                "sentAddresses": 3,
                "receivedAddresses": 0,
                "feesUsed": 0,
                "feesSpent": 0,
                "totalTransactions": 3502
            },
            {
                "date": 1641061800000,
                "sentAmount": 0,
                "receivedAmount": 0,
                "sentAddresses": 3,
                "receivedAddresses": 0,
                "feesUsed": 0,
                "feesSpent": 0,
                "totalTransactions": 3382
            },
            {
                "date": 1641148200000,
                "sentAmount": 0,
                "receivedAmount": 0,
                "sentAddresses": 3,
                "receivedAddresses": 0,
                "feesUsed": 0,
                "feesSpent": 0,
                "totalTransactions": 3537
            },
            {
                "date": 1641234600000,
                "sentAmount": 0,
                "receivedAmount": 0,
                "sentAddresses": 3,
                "receivedAddresses": 0,
                "feesUsed": 0,
                "feesSpent": 0,
                "totalTransactions": 3612
            },
            {
                "date": 1641321000000,
                "sentAmount": 0,
                "receivedAmount": 0,
                "sentAddresses": 3,
                "receivedAddresses": 0,
                "feesUsed": 0,
                "feesSpent": 0,
                "totalTransactions": 3465
            },
            {
                "date": 1641407400000,
                "sentAmount": 0,
                "receivedAmount": 0,
                "sentAddresses": 3,
                "receivedAddresses": 0,
                "feesUsed": 0,
                "feesSpent": 0,
                "totalTransactions": 3413
            }
        ];
        const xdcTransactions = [];
        const uniqueSent = [];
        const uniqueReceived = [];
        for (let index = 0; index < data.length; index++) {
            const x = data[index].date;
            xdcTransactions.push({x, y: data[index].totalTransactions});
            uniqueSent.push({x, y: data[index].sentAddresses});
            uniqueReceived.push({x, y: data[index].receivedAddresses});
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
                split: false
            },
            series: [
                {
                    data: xdcTransactions,
                    color: "rgb(124, 181, 236)",
                    name: "XDC Transactions"
                },
                {
                    data: uniqueSent,
                    color: "rgb(67, 67, 72)",
                    name: "Unique Outgoing Address"
                },
                {
                    data: uniqueReceived,
                    color: "rgb(144, 237, 125)",
                    name: "Unique incoming Address"
                }
            ],
            credits: {enabled: false},
            yAxis: [
                {
                    opposite: false,
                    title: {text: "Values"},
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
