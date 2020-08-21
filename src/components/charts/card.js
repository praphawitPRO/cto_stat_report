import React,{useState,useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    textHead:{ 
        color:"#566573",
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '18px',
        fontSize:'14px',
    },
    text:{
        color:"#000000",
        fontSize:'24px',
    },
    paper:{
        height:'50px',
        flex: '1 1 auto',
        // background:  '#009900',
        margin:'5px',
    },
    })
const Chart = props => {
    const [emp, setEMP] = useState(0); 
    const [check, setCheck] = useState(""); 
    const [notCheck, setNotCheck] = useState(""); 
    useEffect(() => {
        if(!props.data){
            return 
        }
        let totalEMP = 0;
        let totalCheck = 0;
        let totalNotCheck = 0;
        let NumOfDay = 0;
        props.data.forEach(element => {
            totalEMP+=parseInt(element['manpowers']);
            totalCheck+=parseInt(element['total_check_in']);
            totalNotCheck+=parseInt(element['not_check_in']);
            NumOfDay=parseInt(element['day']);
        });
        let Check = ((totalCheck/(NumOfDay*totalEMP))*100).toFixed(2) + '%';
        let NotCheck = ((totalNotCheck/(NumOfDay*totalEMP))*100).toFixed(2) + '%';

        setEMP(totalEMP);
        setCheck(Check);
        setNotCheck(NotCheck);

        console.log(totalEMP);
        
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

            <Paper className={classes.paper}>
                <div className={classes.textHead}>
                    Checked in
                </div>
                <div className={classes.text}>
                    {check}
                </div>
            </Paper>

            <Paper className={classes.paper}>
                <div className={classes.textHead}>
                    Haven't Checked in
                </div>
                <div className={classes.text}>
                    {notCheck}
                </div>
            </Paper>

        </div>
        
    )
};
          
export default Chart