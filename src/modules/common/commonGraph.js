import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const options = {
  title: {
    text: "My stock chart",
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9, 15],
    },
  ],
};

export default function Chart(props) {
  Highcharts.setOptions({
    lang: {
      rangeSelectorFrom: "From",
      rangeSelectorTo: "To",
      rangeSelectorZoom: "Show",
    },
  });
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={props.options}
    />
  );
}
