import Chart from "react-google-charts";
import React,{useState,useEffect} from "react";

const PieChart = props => {
    const [data, setData] = useState([
            // ['Task', 'Hours per Day'],
            // ['Work', 54.75708502],
            // ['Eat', 42.66194332],
            // ['Commute', 0.9109311741],
            // ['Watch TV', 1.670040486],
    ]); 

    useEffect(() => {
        
        const arr = [['Task','percentage for checked in']] ;
        const obj = props.data['0'] ;
        if(!obj){
            return 
        }
        // console.log( obj.wfh);
        // console.log( JSON.stringify(obj));
        arr.push(["Checked in", parseFloat(parseFloat(obj['%check_in']).toFixed(2)) ]) ;
        arr.push(["Haven't Checked in", parseFloat(parseFloat(obj['%not_check_in']).toFixed(2)) ]) ;

        setData(arr);
        // console.log(arr);
        // arr = [];

    },[props.data]);

    return (
        <Chart
            width={'100%'}
            height={'450px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                chartArea: { width: '90%' , height: '80%' },
                legend: {
                    position: 'right', 
                    alignment: 'center',
                    textStyle : {
                        fontSize: 14
                    }
                },
            }}
        />
    )
};
          
export default PieChart