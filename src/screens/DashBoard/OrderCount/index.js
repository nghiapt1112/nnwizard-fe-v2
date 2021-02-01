import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import '../styles.less';

const data = [
  {
    country: 'Jan',
    'hot dog': 135,
    burger: 109,
    sandwich: 111,
    kebab: 183,
    fries: 110,
    donut: 155,
  },
  {
    country: 'Feb',
    'hot dog': 151,
    burger: 129,
    sandwich: 195,
    kebab: 7,
    fries: 156,
    donut: 182,
  },
  {
    country: 'Mar',
    'hot dog': 119,
    burger: 37,
    sandwich: 134,
    kebab: 24,
    fries: 35,
    donut: 84,
  },
  {
    country: 'Apr',
    'hot dog': 50,
    burger: 2,
    sandwich: 43,
    kebab: 94,
    fries: 175,
    donut: 173,
  },
  {
    country: 'May',
    'hot dog': 25,
    burger: 67,
    sandwich: 175,
    kebab: 134,
    fries: 140,
    donut: 27,
  },
  {
    country: 'Jun',
    'hot dog': 151,
    burger: 199,
    sandwich: 18,
    kebab: 23,
    fries: 112,
    donut: 150,
  },
];

const customDefs = [
  {
    id: 'dots',
    type: 'patternDots',
    background: 'inherit',
    color: '#38bcb2',
    size: 4,
    padding: 1,
    stagger: true,
  },
  {
    id: 'lines',
    type: 'patternLines',
    background: 'inherit',
    color: '#eed312',
    rotation: -45,
    lineWidth: 6,
    spacing: 10,
  },
];

const customFillCondition = [
  {
    match: {
      id: 'fries',
    },
    id: 'dots',
  },
  {
    match: {
      id: 'sandwich',
    },
    id: 'lines',
  },
];
const MyResponsiveBar = () => {
  useEffect(() => {}, []);

  const onBarClick = (node, event) => {
    console.log('node: ', node);
    console.log('Id: ', node.id);
    console.log('Value: ', node.value);

    // console.log('eevnt', event);
  };
  return (
    <>
      <p> 6 Months</p>
      <ResponsiveBar
        data={data}
        keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={customDefs}
        fill={customFillCondition}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Months',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Quantity',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                  symbolSize: 20,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        onClick={(node, event) => onBarClick(node, event)}
      />
    </>
  );
};

export default MyResponsiveBar;
