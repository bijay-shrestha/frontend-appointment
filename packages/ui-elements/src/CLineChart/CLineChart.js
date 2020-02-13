import React,{memo} from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = props => {
 const {lineDatasets,width,height} =props;
 
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

}