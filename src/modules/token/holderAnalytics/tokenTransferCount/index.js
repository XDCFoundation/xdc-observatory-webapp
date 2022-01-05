import React from "react";
import styled from "styled-components";
import Graph from "../../../common/commonGraph";
import BaseComponent from "../../../baseComponent";
import TokenListComponent from "../../../tokenList/tokenList";

const GraphContainer = styled.div`
  margin: 20px 0 0 0;
`;

export default class TokenTransferCountGraph extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                uniqueAddressesReceived: 1,
                uniqueAddressesSent: 1,
                outBoundTransfer: 1,
                inBoundTransfer: 2,
                totalTransfers: 3,
                date: 1641287376000
            },
                {
                    uniqueAddressesReceived: 1,
                    uniqueAddressesSent: 1,
                    outBoundTransfer: 1,
                    inBoundTransfer: 2,
                    totalTransfers: 3,
                    date: 1641373776000
                }
            ],
            options: {}
        }
    }


    componentDidMount=()=> {
        const totalTransferData = [];
        const inBoundData = [];
        const outBoundData = [];
        const uniqueAddressSent = [];
        const uniqueAddressReceived = [];
        for(let index=0;index< this.state.data.length;index++){
            totalTransferData.push({x: this.state.data[index].date, y:this.state.data[index].totalTransfers})
            inBoundData.push({x: this.state.data[index].date, y:this.state.data[index].inBoundTransfer})
            outBoundData.push({x: this.state.data[index].date, y:this.state.data[index].outBoundTransfer})
            uniqueAddressSent.push({x: this.state.data[index].date, y:this.state.data[index].uniqueAddressesSent})
            uniqueAddressReceived.push({x: this.state.data[index].date, y:this.state.data[index].uniqueAddressesReceived})
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
                    type:'column',
                    color:"rgb(124, 181, 236)",
                    name: "Total Transfers",
                },
                {
                    data: outBoundData,
                    type:'line',
                    color:"rgb(67, 67, 72)",
                    name: "Outbound Transfers Counts",
                },
                {
                    data: inBoundData,
                    type:'line',
                    color:"rgb(144, 237, 125)",
                    name: "Inbound Transfers Counts",
                },
                {
                    data: uniqueAddressSent,
                    type:'line',
                    color:"rgb(247, 163, 92)",
                    name: "Unique Address Sent",
                },
                {
                    data: uniqueAddressReceived,
                    type:'line',
                    color:"rgb(128, 133, 233)",
                    name: "Unique Address Received"
                }
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
