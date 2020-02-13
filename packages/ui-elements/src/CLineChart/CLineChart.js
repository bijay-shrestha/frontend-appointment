import React,{memo} from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = props => {
 const {lineData,width,height,labels} =props;
 
 const options = {
    responsive: true,
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 2,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    showLines: true,
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
            backgroundColor: "rgba(110,102,155,0.2)",
            fillColor: 'rgba(110,102,155,0.2)',
            borderColor: "rgba(110,102,155,1)",
            borderWidth: 2,
            pointColor: "rgba(110,102,155,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: 'rgba(110,102,155,1)',
            data: lineData
        }
    ]

}

return(
    <Line data={chartFillData} width={width} height={height} options={options}/>
)
}