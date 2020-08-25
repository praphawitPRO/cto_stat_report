import React,{useState,useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    textHead:{ 
        color:"#566573",
        overflow: 'hidden',
        // textOverflow: 'ellipsis',
        // height: '18px',
        fontSize:'20px',
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:"#000000",
        fontSize:'28px',
        flex: '1 1 auto',
    },
    paper:{
        display:'flex',
        width:"100%",
        overflowY:'visible',
		flexWrap:'wrap',
        height:'50px',
        flex: '1 1 auto',
        // background:  '#009900',

        margin:'5px',
    },
    })
const Chart = props => {
    const [emp, setEMP] = useState(0); 
   
    useEffect(() => {
        if(!props.data){
            return 
        }
        let totalEMP = 0;
        let NumOfDay = 0;
        props.data.forEach(element => {
            totalEMP+=parseInt(element['manpowers']);
            
            NumOfDay=parseInt(element['day']);
        });

        setEMP(totalEMP);

        // console.log(totalEMP);
        
    },[props.data]);

    const classes = useStyles();
    return (
        <div
            style={{
                display: 'flex',
                width:'100%',
                height:'60px',
                background:  '#F2F3F4',
            }}
        >
            <Paper className={classes.paper}>
                <div className={classes.textHead}>
                    Total Employees
                </div>
                <div className={classes.text}>
                    {emp}
                </div>

            </Paper>

        </div>
        
    )
};
          
export default Chart