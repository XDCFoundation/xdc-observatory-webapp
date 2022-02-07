import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import BaseComponent from "../../../baseComponent";
import utility from "../../../../utility";
import accounts from "../../../../services/accounts";
import {useParams} from "react-router-dom";
import moment from "moment";
import {CircularProgress} from "@material-ui/core";

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
  margin: 20px;
`;

const NoDataFoundContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
  @media (min-width: 767px) {
    margin: 100px !important;
  }
`;

export default function WrappedComponent() {
    const {address, tn} = useParams();
    return <TokenContractOverviewGraph address={address} tokenName={tn}/>;
}

class TokenContractOverviewGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            graphData: []
        };
    }

    componentDidMount = () => {
        this.getTokenContractOverviewData();
    };

    getTokenContractOverviewData = async () => {
        this.setState({loading: true});

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
            this.setState({loading: false});
            this.generateGraphData([]);
            return;
        }
        this.setState({loading: false});
        this.setState({graphData: response})
        this.generateGraphData(response);
    };

    generateGraphData = (data) => {
        data = data.sort((itemA, itemB) => {
            return itemA.addedOn - itemB.addedOn;
        });

        const TransferAmount = [];
        const TransferCount = [];
        const UniqueAddress = [];
        const UniqueSender = [];
        const UniqueReceiver = [];
        for (let index = 0; index < data.length; index++) {
            const x = data[index].addedOn;
            TransferAmount.push({
                x,
                y: data[index].sentAmount + data[index].receivedAmount,
            });
            TransferCount.push({x, y: data[index].transactionCount});
            UniqueAddress.push({x, y: data[index].uniqueAddress});
            UniqueSender.push({x, y: data[index].uniqueSenders});
            UniqueReceiver.push({x, y: data[index].uniqueReceivers});
        }

        let options = {
            title: {
                text: "",
            },
            chart: {
                type: "line",
                zoomType: {
                    enabled: true,
                },
                spacing: [20, 10, 15, 10],
            },
            legend: {
                layout: "horizontal",
                align: "center",
                enabled: true,
                symbolPadding: 0,
                symbolWidth: 0,
                symbolHeight: 0,
                squareSymbol: false,
                backgroundColor: "#FFFFFF",
                useHTML: true,
                labelFormatter: function () {
                    let legend = "<div style='display:flex; align-items: center;'>";
                    if (this.name == "Transfer Amount") {
                        legend +=
                            "<img style='margin:5px' src='/images/graph-circle-blue.svg' />";
                    }
                    if (this.name == "Transfers Count") {
                        legend += "<img style='margin:5px' src='/images/graph-kite.svg' />";
                    }
                    if (this.name == "Unique Receivers") {
                        legend +=
                            "<img style='margin:5px' src='/images/graph-triangle-red.svg' />";
                    }
                    if (this.name == "Unique Senders") {
                        legend +=
                            "<img style='margin:5px' src='/images/graph-triangle.svg' />";
                    }
                    if (this.name == "Total Uniques") {
                        legend +=
                            "<img style='margin:5px' src='/images/graph-circle-orange.svg' />";
                    }
                    return (legend +=
                        "<div style='margin:5px 5px 5px 0'>" +
                        this.name +
                        "</div>" +
                        "</div>");
                },
            },
            navigator: {
                enabled: false,
            },
            scrollbar: {
                enabled: false,
            },

            rangeSelector: {
                enabled: true,
                selected: 1,
                buttons: [
                    {
                        type: "all",
                        text: "All",
                    },
                    {
                        type: "year",
                        count: 1,
                        text: "1y",
                    },
                    {
                        type: "month",
                        count: 6,
                        text: "6m",
                    },
                    {
                        type: "month",
                        count: 3,
                        text: "3m",
                    },
                    {
                        type: "month",
                        count: 1,
                        text: "1m",
                    },
                ],
                buttonSpacing: 10,

                buttonTheme: {
                    style: {
                        fill: "none",
                    },
                    stroke: "none",
                    fontWeight: "bold",
                    width: null,
                    height: 25,
                    "stroke-width": 0,
                    r: 5,
                    states: {
                        hover: {
                            fill: "#4878ff",
                            style: {
                                color: "white",
                            },
                        },
                        select: {
                            fill: "#4878ff",
                            style: {
                                color: "white",
                            },
                        },
                    },
                },
                inputBoxBorderColor: "#e3e7eb",
                inputBoxWidth: 85,
                inputBoxHeight: 25,
                inputDateFormat: "%d-%m-%Y",
                inputStyle: {
                    color: "#2a2a2a",
                },
                labelStyle: {
                    color: "#252525",
                    fontWeight: "bold",
                },
            },
            exporting: {
                buttons: {
                    contextButton: {
                        text: "Export",
                        enabled: true,
                    },
                },
                enabled: true,
            },
            tooltip: {
                split: false,
                shared: true,
            },
            series: [
                {
                    data: TransferAmount,
                    color: "rgb(124, 181, 236)",
                    name: "Transfer Amount",
                    type: "column",
                },
                {
                    data: TransferCount,
                    color: "rgb(67, 67, 72)",
                    name: "Transfers Count",
                },
                {
                    data: UniqueReceiver,
                    color: "rgb(144, 237, 125)",
                    name: "Unique Receivers",
                },
                {
                    data: UniqueSender,
                    color: "rgb(247, 163, 92)",
                    name: "Unique Senders",
                },
                {
                    data: UniqueAddress,
                    color: "rgb(128, 133, 233)",
                    name: "Total Uniques",
                },
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
    };

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <ProgressBarContainer>
                        <CircularProgress size={40}/>
                    </ProgressBarContainer>
                ) : (
                    <span>
             {this.state.graphData.length == 0 ?
                 <NoDataFoundContainer>
                     <img
                         src={require("../../../../../src/assets/images/XDC-Alert.svg")}
                     ></img>

                     <div>No Data found.</div>
                 </NoDataFoundContainer>
                 :
                 <Graph options={this.state.options}/>
             }
             </span>
                )}
            </div>
        );
    }
}
