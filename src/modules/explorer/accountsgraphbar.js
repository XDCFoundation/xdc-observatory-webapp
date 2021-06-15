import React from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsiveLine } from '@nivo/line';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import '../../assets/styles/custom.css';

const data = 
[
    {
        "id": "japan",
        "color": "hsl(291, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 178
          },
          {
            "x": "helicopter",
            "y": 207
          },
          {
            "x": "boat",
            "y": 34
          },
          {
            "x": "train",
            "y": 295
          },
          {
            "x": "subway",
            "y": 10
          },
          {
            "x": "bus",
            "y": 94
          },
          
        ]
      },
  ]

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
  data={data}
  
  xScale={{ type: 'point' }}
  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
  yFormat=" >-.2f"
  curve="cardinal"
  axisTop={null}
  axisRight={null}
  axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle'
  }}
  axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
  }}
  enableGridX={false}
  enableGridY={false}
  enablePoints={false}
  pointSize={10}
  pointColor={{ theme: 'background' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  pointLabelYOffset={-12}
  enableArea={true}
  enableCrosshair={false}
  useMesh={true}
  legends={[
      {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
              {
                  on: 'hover',
                  style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                  }
              }
          ]
      }
  ]}
/>
)

export default function App() {
  return (
    <div style={{ height: 122, width: 370}}>
      <MyResponsiveLine data={data} />
    </div>
  );
}