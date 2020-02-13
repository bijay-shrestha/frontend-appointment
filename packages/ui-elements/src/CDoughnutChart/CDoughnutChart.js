import React, {memo} from 'react'
import {Doughnut} from 'react-chartjs-2'
const CDoughnutChart = props => {
  const {dataSets,width,height} = props

  const options = {
    animateRotate: true,
    animationEasing: 'easeInExpo',
    responsive: true,
    legend: {
      display: false
    }
  }
  return <Doughnut data={dataSets} options={options} width={width} height={height} redraw/>
}
export default memo(CDoughnutChart);