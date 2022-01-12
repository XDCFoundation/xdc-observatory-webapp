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
        this.getXdcTransferData();
    }

    getXdcTransferData = async () => {
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
