import React, {memo} from 'react'
import {Doughnut} from 'react-chartjs-2'
const CDoughnutChart = props => {
  const {chartData, width, height, mode} = props

  const options = {
    animateRotate: true,
    animationEasing: 'easeInExpo',
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      //enabled: true,
      mode: 'index',
      callbacks: {
        label: function (tooltipItem, data) {
          const {index} = tooltipItem
          const {datasets, labels} = data
          return mode === 'AS'
            ? labels[index] + ':' + datasets[0].data[index] + '%'
            : labels[index] + ':' + datasets[0].data[index]
        }
      }
    }
  }
  return (
    <Doughnut
      data={chartData}
      options={options}
      width={width}
      height={height}
    />
  )
}
export default memo(CDoughnutChart)
