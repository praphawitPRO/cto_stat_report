import Chart from "react-google-charts";
import React,{useState,useEffect} from "react";

const PieChart = props => {
    return (
        <Chart
            width={'100%'}
            height={'390px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Task', 'Hours per Day'],
                ['Work', 54.75708502],
                ['Eat', 42.66194332],
                ['Commute', 0.9109311741],
                ['Watch TV', 1.670040486],
            ]}
            options={{
                chartArea: { width: '90%' },
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