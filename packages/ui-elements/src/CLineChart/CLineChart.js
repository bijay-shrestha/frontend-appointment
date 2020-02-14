import React,{memo} from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = props => {
 const {lineData,width,height,labels} =props;

 
 const options = {
    animation: {
        duration: 300, // general animation time
    },
    responsive: true,
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 0,
    bezierCurve: false,
    bezierCurveTension: 0,
    showLines: true,
    lineTension:0,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
    //For y axes scale to always begin at 0
};

const chartFillData = {

    labels: labels,
    datasets: [
        {
            label:'Revenue Refund',
            backgroundColor:'rgba(0, 99, 255, 0.2)',
            fillColor: 'rgba(0, 99, 255, 0.2)',
            borderColor: '#0063ff',
            borderWidth: 2,
            pointColor: 'rgba(0, 99, 255, 1)',
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: 'rgba(0, 99, 255, 0.2)',
            data: lineData
        }
    ]

}

return(
    <Line data={chartFillData} width={width} height={height} options={options} redraw/>
)
}
export default memo(LineChart);