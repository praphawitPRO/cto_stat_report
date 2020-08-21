import Chart from "react-google-charts";
import React,{useState,useEffect} from "react";

const BarChart = props => {
    const [data, setData] = useState([
        // ['department', 'w@o', 'wfh', 'sick', 'other'],
        // ["CTO Office",	 { v: 77.9661, f: '77.9%' },	10.1695,	0.0000,	11.8644],
        // ["Engineering",	56.8699,	40.9993,	0.7348,	1.3960],
        // ["Finance", 43.7500,	50.0000,	0.0000,	6.2500],
        // ["President, CRC's Office",	100.0000,	0.0000,	0.0000,	0.0000],
        // ["Product Management",	36.1111,	60.6481,	1.8519,	1.3889],
        // ["Retail Innovation",	91.0891,	8.9109,	10.0000,	0.0000],
    ]); 
    
    useEffect(() => {
        if(!props.data){
            return 
        }
        const arr = [['department', 'w@o', 'wfh', 'sick', 'other']] ;
        props.data.forEach(element => {
            arr.push([element.department, 
                { v: parseFloat(element['w@o']), f: parseFloat(element['w@o']).toFixed(2)+'%' }, 
                { v: parseFloat(element.wfh), f: parseFloat(element.wfh).toFixed(2)+'%' }, 
                { v: parseFloat(element.sick), f: parseFloat(element.sick).toFixed(2)+'%' }, 
                { v: parseFloat(element.others), f: parseFloat(element.others).toFixed(2)+'%' }]) ;
        });
        
        setData(arr);
        console.log(arr);
        
    },[props.data]);


    return (
        <Chart
            width={'100%'}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
            // Material design options
                // title: '07-2020',
                chartArea: { width: '90%' },
                hAxis: {
                    // title: 'Department',
                    textStyle : {
                        fontSize: 12
                    },
    
                },
                vAxis: {
                    title: '%',
                },
                legend: { position: 'top', alignment: 'end'},
            }}
            legendToggle
            // For tests
                // rootProps={{ 'data-testid': '2' }}
        />
    )
};
          
export default BarChart