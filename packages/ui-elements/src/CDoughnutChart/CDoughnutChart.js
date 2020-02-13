import React, {memo} from 'react'
import {Doughnut} from 'react-chartjs-2'
const CDoughnutChart = props => {
  const {chartData, width, height} = props

  const options = {
    animateRotate: true,
    animationEasing: 'easeInExpo',
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = ctx.dataset._meta[0].total
          let percentage = ((value * 100) / sum).toFixed(2) + '%'
          return percentage
        },
        color: '#fff'
      }
    }
  }
  return (
    <Doughnut data={chartData} options={options} width={width} height={height} />
  )
}
export default memo(CDoughnutChart)
