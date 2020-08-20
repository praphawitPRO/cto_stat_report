import Chart from "react-google-charts";
import React,{useState,useEffect} from "react";

const BarChart = props => {
    const data = [
        ['City', 'Checked in (%)', "Haven't Checked in (%)"],
        ["President, CRC's Office"+' ( 184 )', 8175000, 8008000],
        ['Los Angeles, 34', 3792000, 3694000],
        ['Chicago, 67', 2695000, 2896000],
        ['Houston, 9', 2099000, 1953000],
        ['Philadelphia, 1', 1526000, 1517000],
    ];

    const options = {
        // title: 'Population of Largest U.S. Cities',
        legend: { position: 'top', alignment: 'end'},
        chartArea: { width: '60%' },
        colors: ['#F32421', '#0274E7'],
        bars: 'horizontal',
        hAxis: {
            title: 'Total Population',
            minValue: 0,
        },
        vAxis: {
            title: 'City',
        },
        
    };

    return (
        <Chart
            width={'100%'}
            height={'270px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
        />
    )
};
          
export default BarChart