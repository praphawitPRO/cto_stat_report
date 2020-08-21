import Chart from "react-google-charts";
import React,{useState,useEffect} from "react";

const BarChart = props => {
    const [data, setData] = useState([
        // ['City', 'Checked in (%)', "Haven't Checked in (%)"],
        // ["President, CRC's Office"+' ( 184 )', 8175000, 8008000],
        // ['Los Angeles, 34', 3792000, 3694000],
        // ['Chicago, 67', 2695000, 2896000],
        // ['Houston, 9', 2099000, 1953000],
        // ['Philadelphia, 1', 1526000, 1517000],
    ]); 

    useEffect(() => {
        if(!props.data){
            return 
        }
        const arr = [['City', 'Checked in (%)', "Haven't Checked in (%)"]] ;
        props.data.forEach(element => {
            arr.push([
                element.department + ' ('+element.manpowers+')', 
                parseFloat(parseFloat(element['%check_in']).toFixed(2)), 
                parseFloat(parseFloat(element['%not_check_in']).toFixed(2))
            ]) ;
        });
        
        setData(arr);
        console.log(arr);
        
    },[props.data]);

    const options = {
        // title: 'Population of Largest U.S. Cities',
        legend: { position: 'right', alignment: 'end'},
        chartArea: { width: '50%' , height: '80%'},
        colors: ['#0274E7','#F32421'],
        bars: 'horizontal',
        hAxis: {
            // title: 'Total Population',
            minValue: 0,
        },
        vAxis: {
            // title: 'City',
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