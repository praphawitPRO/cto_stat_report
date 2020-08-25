import Chart from "react-google-charts";
import React,{useState,useEffect} from "react";

const LineChart = props => {
    const [data,setData] = useState([
        // ['date', 'Checked in', "Haven't Checked in"],
        // ["1 aug 2020", 0, 0],
        // ["2 aug 2020", 5, 5],
        // ["3 aug 2020", 23, 24],
        // ["4 aug 2020", 17, 9],
        // ["5 aug 2020", 18, 10],
        // ["6 aug 2020", 9, 5],
        // ["7 aug 2020", 11, 3],
        // ["8 aug 2020", 27, 19],
        // ["9 aug 2020", 27, 19],
        // ["10 aug 2020", 27, 19],
        // ["12 aug 2020", 27, 19],
        // ["13 aug 2020", 27, 19],
        // ["14 aug 2020", 27, 19],
        // ["15 aug 2020", 27, 19],
        // ["16 aug 2020", 27, 19],
        // ["17 aug 2020", 10, 5],
        // ["18 aug 2020", 23, 15],
        // ["19 aug 2020", 17, 9],
        // ["20 aug 2020", 18, 10],
        // ["21 aug 2020", 9, 5],
        // ["22 aug 2020", 11, 3],
        // ["23 aug 2020", 27, 19],
        // ["24 aug 2020", 27, 19],
        // ["25 aug 2020", 27, 19],
        // ["26 aug 2020", 27, 19],
        // ["27 aug 2020", 27, 19],
        // ["28 aug 2020", 27, 19],
        // ["29 aug 2020", 27, 19],
        // ["30 aug 2020", 27, 19],
        // ["31 aug 2020", 27, 19],
    ]);

    useEffect(() => {
            if(!props.data){
                return 
            }
        
            const arr = [['date', 'Checked in', "Haven't Checked in"]] ;
            props.data.forEach(element => {
                arr.push([
                    element["date_check_in"], 
                    parseInt(element['check_in']),  
                    parseInt(element['no_check_in'])
                ]) ;
            });
            
            setData(arr);
            // console.log(arr);
        
    },[props.data]);

    const options = {
        legend: { 
            position: 'top', 
            alignment: 'end',
            textStyle : {
                fontSize: 8
            }
        },
        chartArea: { width: '85%', height:'50%' },
        hAxis: {
            // title: 'Date',
            textStyle : {
                fontSize: 8
            },
            
            
        },
        vAxis: {
            viewWindowMode:'explicit',
            viewWindow: {
              min:0
            },
            // ticks: [0, 50, 100, 150, 200, 250, 300] 
        },
        series: {
            0: { curveType: 'function' },
            1: { curveType: 'function' },
        },
        
        
    };

    return (
        <Chart
            width={'100%'}
            height={'200px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
            //   rootProps={{ 'data-testid': '2' }}
        />
    )
};
          
export default LineChart