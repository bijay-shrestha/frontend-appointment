import React,{memo} from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = props => {
 

 const{
    label,
    backgroundColor,
    fillColor,
    borderColor,
    borderWidth,
    pointColor,
    pointStrokeColor,
    pointHighlightFill,
    pointHighlightStroke,
    scaleGridLineColor,
    lineData,
    width,
    height,
    labels,
    revenueFilter
 }=props;
 const options = {
    animation: {
        duration: 300, // general animation time
    },
    responsive: true,
    scaleShowGridLines: true,
    scaleGridLineColor: scaleGridLineColor||'rgba(0,0,0,.05)',
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
        ],
        xAxes:[{
            ticks: {
                userCallback: function(label, index, labels) {
                    if(revenueFilter==='M')
                     return index%2!==0?'':label;
                    else
                     return label;
                }
             }
        }]
    }
    //For y axes scale to always begin at 0
};

const chartFillData = {

    labels: labels,
    datasets: [
        {
            label:label||'Revenue Refund',
            backgroundColor:backgroundColor||'rgba(0, 99, 255, 0.2)',
            fillColor: fillColor||'rgba(0, 99, 255, 0.2)',
            borderColor: borderColor||'#0063ff',
            borderWidth: borderWidth||2,
            pointColor: pointColor||'rgba(0, 99, 255, 1)',
            pointStrokeColor:pointStrokeColor|| "#fff",
            pointHighlightFill: pointHighlightFill||"#fff",
            pointHighlightStroke: pointHighlightStroke||'rgba(0, 99, 255, 0.2)',
            data: lineData
        }
    ]

}

return(
    <Line data={chartFillData} width={width} height={height} options={options} />
)
}
export default memo(LineChart);