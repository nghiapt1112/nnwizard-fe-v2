import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import '../styles.less';

const data = [
  {
    id: 'DRAFT',
    label: 'Draft',
    value: 277,
    color: 'hsl(225, 70%, 50%)',
  },
  {
    id: 'QAS',
    label: 'QA Scanning',
    value: 509,
    color: 'hsl(277, 70%, 50%)',
  },
  {
    id: 'WIP',
    label: 'WIP',
    value: 541,
    color: 'hsl(124, 70%, 50%)',
  },
  {
    id: 'RESOLVED',
    label: 'Resolved',
    value: 456,
    color: 'hsl(205, 70%, 50%)',
  },
  {
    id: 'DONE',
    label: 'Done',
    value: 105,
    color: 'hsl(303, 70%, 50%)',
  },
];

const customDefs = [
  {
    id: 'dots',
    type: 'patternDots',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.3)',
    size: 4,
    padding: 1,
    stagger: true,
  },
  {
    id: 'lines',
    type: 'patternLines',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.3)',
    rotation: -45,
    lineWidth: 6,
    spacing: 10,
  },
];

const customFillCondition = [
  {
    match: {
      id: 'DRAFT',
    },
    id: 'dots',
  },
  {
    match: {
      id: 'DONE',
    },
    id: 'lines',
  },
];

const OrderByStatus = () => {
  useEffect(() => {}, []);

  const onPieClick = (node, event) => {
    console.log('node: ', node);
    console.log('Id: ', node.id);
    console.log('Value: ', node.value);

    // console.log('eevnt', event);
  };
  return (
    <>
      <p> Order By status</p>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.2}
        padAngle={1}
        cornerRadius={1}
        colors={{ scheme: 'nivo' }}
        borderWidth={0}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabel={(e) => e.label}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={customDefs}
        fill={customFillCondition}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                  symbolSize: 20,
                },
              },
            ],
          },
        ]}
        onClick={(node, event) => onPieClick(node, event)}
      />
    </>
  );
};

export default OrderByStatus;
