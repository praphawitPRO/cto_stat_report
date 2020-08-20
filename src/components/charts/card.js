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
                    265
                </div>

            </Paper>

            <Paper className={classes.paper}>
                <div className={classes.textHead}>
                    Checked in
                </div>
                <div className={classes.text}>
                    265
                </div>
            </Paper>

            <Paper className={classes.paper}>
                <div className={classes.textHead}>
                    Haven't Checked in
                </div>
                <div className={classes.text}>
                    265
                </div>
            </Paper>

        </div>
        
    )
};
          
export default Chart