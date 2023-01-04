import React from 'react';
import Chart from 'react-apexcharts';
import { Col } from 'antd';
import { ApexOptions } from 'apexcharts';

const randomizeArray = function (arg: Array<number>) {
  const array = arg.slice();
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const sparklineData: Array<number> = [
  47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
  27, 54, 43, 19, 46
];

const labels = [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`);

interface Props {
  subtitle: string;
  title: string;
}

const ChartDashboard = ({ subtitle, title }: Props) => {
  const series = [
    {
      name: 'Sales',
      data: randomizeArray(sparklineData)
    }
  ];

  const options: ApexOptions = {
    chart: {
      id: `sparkline-${subtitle}`,
      group: 'sparklines',
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 1
    },
    series: [
      {
        name: 'Sales',
        data: randomizeArray(sparklineData)
      }
    ],
    labels: labels,
    yaxis: {
      show: false
    },
    xaxis: {
      type: 'category'
    },
    colors: ['#008FFB'],
    title: {
      text: title,
      style: {
        fontSize: '24px'
      }
    },
    subtitle: {
      text: subtitle,
      style: {
        fontSize: '14px'
      }
    }
  };

  return (
    <Col xs={24} lg={8}>
      <Chart options={options} series={series} type="area" height={150} />
    </Col>
  );
};

export default ChartDashboard;
