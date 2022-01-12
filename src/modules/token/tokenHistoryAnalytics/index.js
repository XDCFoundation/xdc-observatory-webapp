import React from "react";
import styled from "styled-components";
import Graph from "../../common/commonGraph";
import BaseComponent from "../../baseComponent";
import utility from "../../../utility";
import accounts from "../../../services/accounts";
import { useParams } from "react-router-dom";
import moment from "moment";

const GraphContainer = styled.div`
  margin: 45px 0 0 0;
`;

export default function WrappedComponent(props) {
    const { tn } = useParams();
    return <TokenPriceHistoryGraph contractAddress={props.contractAddress} tokenName={tn} />;
}

class TokenPriceHistoryGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        this.getHistoricalTokenData();
    }

    getHistoricalTokenData = async () => {
        const tokenAddress = window.location.pathname.split("/")[2];
        // const tokenAddress = this.props.contractAddress;
        let request = {
            tokenAddress: tokenAddress,
            startTime: moment().subtract(2, "month").valueOf(),
            endTime: moment().valueOf(),
        };
        let [error, response] = await utility.parseResponse(
            accounts.getHistoryPrice(request)
        );
        if (error || !response) {
            this.generateGraphData([]);
            return;
        }
        this.generateGraphData(response);
    }

    generateGraphData = (data) => {
        // const data = [{
        //     "tokenAddress": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
        //     "closingTime": 1641427199000,
        //     "openingTime": 1641340800000,
        //     "highValueTime": 1641391199000,
        //     "lowValueTime": 1641405599000,
        //     "openingPrice": 100,
        //     "highestPrice": 120,
        //     "lowestPrice": 90,
        //     "closingPrice": 105,
        //     "volume": 66994920902.7202,
        //     "marketCap": 4530215218.84018,
        //     "timestamp": 1641340800000
        // },
        //     {
        //         "tokenAddress": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
        //         "closingTime": 1641427199000,
        //         "openingTime": 1641340800000,
        //         "highValueTime": 1641391199000,
        //         "lowValueTime": 1641405599000,
        //         "openingPrice": 100,
        //         "highestPrice": 120,
        //         "lowestPrice": 90,
        //         "closingPrice": 120,
        //         "volume": 66994920902.7202,
        //         "marketCap": 4530215218.84018,
        //         "timestamp": 1641487232000
        //     },
        //     {
        //         "tokenAddress": "xdc536dd70445cea1e97f9bf1bada04cbda5199a2a1",
        //         "closingTime": 1641427199000,
        //         "openingTime": 1641340800000,
        //         "highValueTime": 1641391199000,
        //         "lowValueTime": 1641405599000,
        //         "openingPrice": 100,
        //         "highestPrice": 120,
        //         "lowestPrice": 90,
        //         "closingPrice": 150,
        //         "volume": 66994920902.7202,
        //         "marketCap": 4530215218.84018,
        //         "timestamp": 1641573632000
        //     }
        // ]
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
                split: false,
                formatter: function () {
                    let tooltip = moment(this.x).format('dddd, MMM D, YYYY');
                    tooltip += '<br><h2 style="font-size:20px">Daily Price</h2>';
                    tooltip += '<br><h2>High - </h2>' + '<label style="font-weight: bold">' + this.point.highestPrice + ' USD</label>';
                    tooltip += '<br><h2>Low - </h2>' + '<label style="font-weight: bold">' + this.point.lowestPrice + ' USD</label>';
                    tooltip += '<br><h2>Close - </h2>' + '<label style="font-weight: bold">' + this.point.closingPrice + ' USD</label>';
                    return tooltip;
                }
            },
            series: [
                {
                    data: data.map(obj => {
                        obj.x = obj.timestamp;
                        obj.y = obj.closingPrice;
                        return obj;
                    }),
                    color: "rgb(124, 181, 236)",
                    name: this.props.tokenName + " Daily Price"
                }
            ],
            credits: { enabled: false },
            yAxis: [
                {
                    opposite: false,
                    title: { text: this.props.tokenName + " Price(USD)" },
                },
            ],
            xAxis: [
                {
                    showInLegend: false,
                    opposite: false,
                    title: { text: "" },
                },
            ],
        };
        this.setState({ options });
    }


    render() {
        return (
            <GraphContainer>
                <Graph options={this.state.options} />
            </GraphContainer>
        );
    }
}
