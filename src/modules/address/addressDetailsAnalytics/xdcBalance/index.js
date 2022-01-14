import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import BaseComponent from "../../../baseComponent";
import {useParams} from "react-router-dom";
import accounts from "../../../../services/accounts";
import utility from "../../../../utility";
import moment from 'moment';

const GraphContainer = styled.div`
  margin: 45px 0 0 0;
`;

export default function WrappedComponent() {
    const {addr} = useParams();
    return <XDCBalanceGraph address={addr}/>;
}

class XDCBalanceGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        this.getAddressAnalyticsData();
    }

    getAddressAnalyticsData = async () => {
        const address = this.props.address;
        const request = {
            "address": address,
            "from": moment().subtract(2, "month").valueOf(),
            "to": moment().valueOf(),
            "currency":"USD", // only in case of balance
            "type":"XDC_BALANCE"
        }
        let [error, response] = await utility.parseResponse(accounts.getAddressAnalytics(request));
        if (error || !response) {
            this.generateGraphData([]);
            return;
        }
        this.generateGraphData(response);
    }

    generateGraphData = (data) => {
        // const data = [
        //     {
        //         "date": 1641969404000,
        //         "toAmount": 0,
        //         "fromAmount": 0,
        //         "totalDocument": 3857,
        //         "totalAmount": 0,
        //         "currentBalance": 5000000001865,
        //         "priceInUSD": 0.10371446281249
        //     },
        //     {
        //         "date": 1642035987000,
        //         "toAmount": 0,
        //         "fromAmount": 0,
        //         "totalDocument": 6857,
        //         "totalAmount": 0,
        //         "currentBalance": 8000000001865,
        //         "priceInUSD": 1.10371446281249
        //     }
        // ];
        const xdcBalance = [];
        const historicUSDPrice = [];
        const transactionCount = [];
        for (let index = 0; index < data.length; index++) {
            const x = data[index].date;
            xdcBalance.push({x, y: data[index].currentBalance/10**18});
            historicUSDPrice.push({x, y: data[index].priceInUSD});
            transactionCount.push({x, y: data[index].totalDocument});
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
                    data: xdcBalance,
                    color: "rgb(124, 181, 236)",
                    name: "XDC Account Balance"
                },
                {
                    data: historicUSDPrice,
                    color: "rgb(67, 67, 72)",
                    name: "Historic USD Value"
                },
                {
                    data: transactionCount,
                    color: "rgb(247, 163, 92)",
                    name: "Txn Count"
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
