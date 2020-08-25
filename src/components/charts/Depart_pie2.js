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
        arr.push(["w@o", parseFloat(parseFloat(obj['w@o']).toFixed(2)) ]) ;
        arr.push(["wfh", parseFloat(parseFloat(obj['wfh']).toFixed(2)) ]) ;
        arr.push(["sick", parseFloat(parseFloat(obj['sick']).toFixed(2)) ]) ;
        arr.push(["others", parseFloat(parseFloat(obj['others']).toFixed(2)) ]) ;

        setData(arr);
        // console.log(arr);
        // arr = [];

    },[props.data]);

    return (
        <Chart
            width={'100%'}
            height={'380px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                chartArea: { width: '90%', height: '70%' },
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