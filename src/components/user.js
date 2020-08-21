import React,{useState,useEffect,forwardRef } from "react";
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector,useDispatch } from 'react-redux';
import Select  from 'react-select';

import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Iframe from 'react-iframe'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import { TextareaAutosize } from "@material-ui/core";

// import { useWindowSizeManager } from './WindowSizemanager';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
const TableUser = props => {
    const dispatch = useDispatch()
    const arrDate = useSelector(state => state.report.arrDate);
    const Data = useSelector(state => state.report.dataUser);

    //add date to selector
    let datelist =[];
    arrDate.forEach(element => {
      const d = new Date(element)
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
      const date = `${da} ${mo} ${ye}` ;
      // console.log(date)
      datelist.push({ label: date, value: element}) 
    });

    let [ date, setDate ] = useState({ label: datelist[0].label, value:datelist[0].value});
    let [tableTitle,setTableTitle] = useState('Employee Reports as '+datelist[0].label); 
    const [depart,setDepart] = useState(
      ["ALL", "CTO Office", "Engineering", "Finance", "President, CRC's Office",
    "Product Management", "Retail Innovation"]
    );
    let departlist =[];
    depart.forEach(element => {
      departlist.push({ label: element, value: element}) 
    });  
    let [ selDepart, setSelDepart ] = useState({ label: departlist[0].label, value:departlist[0].value});

    useEffect(() => {
      console.log(date.value.toString());
      axios.post('https://ctx-core.central.tech/report-api/public/index.php/user', {
          date : date.value
          }).then(res => {
            dispatch({ type: 'setDataUser' ,payload:res.data });
            console.log(res.data);
      });
      setSelDepart({ label: departlist[0].label, value:departlist[0].value});
    },[date]);

    const selectStyles = {
      menu: base => ({
        ...base,
        zIndex: 15000,
        
      }),
      container: provided => ({
        ...provided,
        width: '150px',
        minHeight:40,
      })
    };

    const useStyles = makeStyles({
      root: {
        width: '100%',
        overflowX: 'auto',
        minHeight:720,
        paddingTop:0,
      },
      paper_h: {
        width: '100%',
        minHeight:100,
        maxHeight:200,
        paddingBottom:10,
        paddingTop:10,
        // overflowX: 'auto',
        // overflow: 'auto',
      },
      stickyActionsColumn: {
          '& table:first-child': {
            '& tr': {
              '& td:first-child, th:first-child': {
                backgroundColor: '#f5f5f5',
                position: 'sticky',
                left: 0,
                zIndex: 999
              },
              '& th:first-child': {
                zIndex: 9999
              }
            }
          }
      },
      select:{
        float:'left',
        height:'40px',
        
      },
      title:{
        float:'left',
        paddingLeft: 10,
        width:'120px',
        paddingTop:'.5%',
        // paddingBottom:'.5%',
        textAlign:'left',
        height:'40px',
        fontSize:14,
        // alignItems: 'center',
        
      },
      
      box_select:{
        width:'100%',
        minHeight:40,
      },

      iframe:{
        display: 'flex',
        width:'100%',
        maxHeight:1080,
      },
      
    })
      const classes = useStyles();
    return (
      <Paper className={classes.root}>
          
          <Paper 
              className={classes.paper_h}
            >
            <div className={classes.box_select}>
              <div className={classes.title}>DATE : </div>
              <Select  
                className={classes.select}
                styles={selectStyles}
                onChange={(e) => { setDate(e);setTableTitle('Employee Reports as '+e.label) }}
                options ={ datelist } 
                value={ date }
                defaultValue={ date }
              />
            </div>
            
            <div className={classes.box_select}>
              <div className={classes.title}>DEPARTMENT : </div>
              <Select  
                className={classes.select}
                styles={selectStyles}
                onChange={(g) => {setSelDepart(g) }}
                options ={ departlist } 
                value={ selDepart }
                defaultValue={ selDepart }
              />
            </div>
            
          </Paper>
          <div className={classes.stickyActionsColumn}>
            <MaterialTable 
                        icons={tableIcons}
                        title={tableTitle}
                        options={{ 
                            
                            pageSize:10,
                            pageSizeOptions:[10,15,20,25],
                            //actionsColumnIndex: -1,
                            exportButton: true,
                            exportAllData: true,
                            
                            cellStyle: {
                                width: 50,
                                maxWidth: 100,
                                padding:8,
                                textAlign:'center',
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                },
                            headerStyle: {
                                backgroundColor: '#AFAFAF',
                                color: '#FFF',
                                fontSize : '15px',
                                fontWeight : 'bold',
                                minWidth: 50,
                                maxWidth: 100,
                                padding:8,
                                textAlign:'center'
                            },
                        }}
                        columns={[
                            
                            { title: 'E-mail', field: 'user_email' , defaultSort :'asc'   },
                            { title: 'Department', field: 'department', sorting:false  },
                            { title: 'Position', field: 'position', sorting:false  }, 
                            { title: 'Check in', field: 'check_in' , sorting:false },
                            { title: 'Time', field: 'created_at', sorting:false },
                            { title: 'Type', field: 'type', sorting:false },

                        ]}
                        data={ selDepart.value==="ALL"?Data:Data.filter(x => x.department == selDepart.value) }     
                    />
          </div>
          
      </Paper>
    )
      
  };

  
export default TableUser