import React,{useState,useEffect,forwardRef } from "react";
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector,useDispatch } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import BarChart from './charts/bar.js';
import LineChart from './charts/line.js';
import TableChart from './charts/table_chart.js';
import PieChart from './charts/pie.js';
import CardChart from './charts/card.js';

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
const TableDepartment = props => {
		const dispatch = useDispatch()
		const arrDate = useSelector(state => state.report.arrDate);
		const arrMonth = useSelector(state => state.report.arrMonth);
		const Data = useSelector(state => state.report.dataDepartment);

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
		let [tableTitle,setTableTitle] = useState('Department Reports as '+datelist[0].label); 
		
		//add month to selector
		let monthList =[];
		arrMonth.forEach(element => {
			const d = new Date(element)
			const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
			const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
			// const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
			const date = `${mo} ${ye}` ;
			// console.log(date)
			monthList.push({ label: date, value: element}) 
		});
		let [ selMonth, setSelMonth ] = useState({ label: monthList[0].label, value:monthList[0].value});
		let [ selC, setSelC ] = useState(false);

		//data chart
		const [dataBar,setDataBar] =useState({data:[]});
		const [dataPie,setDataPie] =useState({data:[]});
		const [dataLine,setDataLine] =useState({data:[]});
		const [dataTable,setDataTable] =useState({data:[]});

		useEffect(() => {
			axios.post('https://ctx-core.central.tech/report-api/public/index.php/date', {
				month : selMonth.value
				}).then(res => {
					dispatch({ type: 'setArrDate' ,payload:res.data.date });
					console.log(res.data);
			});
			datelist =[];
			arrDate.forEach(element => {
				const d = new Date(element)
				const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
				const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
				const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
				const date = `${da} ${mo} ${ye}` ;
				// console.log(date)
				datelist.push({ label: date, value: element}) 
			});
			console.log(date.value.toString());

			axios.post('https://ctx-core.central.tech/report-api/public/index.php/bar_chart', {
				month : selMonth.value
				}).then(res => {
					setDataBar({data:res.data});
					console.log(res.data);
			});

			axios.post('https://ctx-core.central.tech/report-api/public/index.php/pie_chart', {
				month : selMonth.value
				}).then(res => {
					setDataPie({data:res.data});
					console.log(res);
					console.log(res.data);
			});

			axios.post('https://ctx-core.central.tech/report-api/public/index.php/line_chart', {
				month : selMonth.value
				}).then(res => {
					setDataLine({data:res.data});
					console.log(res);
					console.log(res.data);
			});

			axios.post('https://ctx-core.central.tech/report-api/public/index.php/table_chart', {
				month : selMonth.value
				}).then(res => {
					setDataTable({data:res.data});
					console.log(res);
					console.log(res.data);
			});

			
			if(selC){
				setSelC(false);
				axios.post('https://ctx-core.central.tech/report-api/public/index.php/department', {
						date : date.value
						}).then(res => {
							dispatch({ type: 'setDataDepartment' ,payload:res.data });
							console.log(res.data);
				});
			}
			
		},[selMonth]);

		useEffect(() => {
			axios.post('https://ctx-core.central.tech/report-api/public/index.php/department', {
					date : date.value
					}).then(res => {
						dispatch({ type: 'setDataDepartment' ,payload:res.data });
						console.log(res.data);
			});
		},[date]);

		const selectStyles = {
			menu: base => ({
				...base,
				zIndex: 10000,
				
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
				// maxHeight:1080,
				
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
				select:{
					float:'left',
					height:'40px',
					
				},

				box_select:{
					width:'100%',
					minHeight:40,
				},
			})
			const classes = useStyles();
		return (
			<Paper className={classes.root}>
				<div className={classes.box_select}>
					<div className={classes.title}>Month : </div>
					<Select  
							className={classes.select}
							styles={selectStyles}
							onChange={(e) => { setSelMonth(e);setSelC(true);setTableTitle('Please select date again.'); setDate({ label: "", value:""})}}
							options ={ monthList } 
							value={ selMonth }
							defaultValue={ selMonth }
					/>
				</div>

				<div
					style={{
						background:  '#F2F3F4',
					}}
				>
					{/* container top */}
					<div 
						style={{
							display:'flex',
							width:"100%",
							paddingTop:'10px',
							paddingLeft:'10px',
							paddingRight:'10px',
							overflowY:'visible',
							flexWrap:'wrap',
						}}
					>
						{/* container top left */}
						<div 
							style={{
								overflowY: 'visible',
								width:"60%",
								minWidth:"350px",
								paddingRight:'10px',
							}}
						>
							<div 
								style={{
									width:"100%",
									// background:  '#0000FF',
									paddingBottom:'10px',
									
								}}
							>
								<TableChart {...dataTable}/>
							</div>
							<div 
								style={{
									width:"100%",
									
								}}
							>
								<LineChart {...dataLine}/>
							</div>
						
						</div>
						{/* container top right */}
						<div 
							style={{
								display: 'flex',
								width:"40%",
								flexWrap: 'wrap',
								minWidth:'350px',
								// background:  '#0000FF',
							}}
						>
							<div 
								style={{
									width:"100%",
									// background:  '#000000',
								}}
							>
								<CardChart {...dataTable}/>
							</div>                
							<div 
								style={{
									width:"100%",
									paddingTop:"10px",
								}}
							>
								<PieChart {...dataPie}/>
							</div>
						</div>
					</div>
					{/* container bottom */}
					<div 
						style={{
							display: 'flex',
							width:"100%",
							padding:'10px',
						}}
					>
						<BarChart {...dataBar}/>
					</div>
							
				</div>
				
				<div className={classes.box_select}>
					<div className={classes.title}>DATE : </div>
					<Select  
							className={classes.select}
							styles={selectStyles}
							onChange={(e) => { setDate(e);setSelC(true);setTableTitle('Department Reports as '+e.label); }}
							options ={ datelist } 
							value={ date }
							// defaultValue={ date }
					/>
				</div>
							
				<div className={classes.stickyActionsColumn}>
						<MaterialTable 
								icons={tableIcons}
								title={tableTitle}

								options={{ 
										// tableLayout:'fixed',
										pageSize:6,
										pageSizeOptions:[],
										//actionsColumnIndex: -1,
										exportButton: true,
										exportAllData: true,
										
										cellStyle: {
												// backgroundColor: '#AFAFAF',
												width: 80,
												maxWidth: 80,
												padding:5,
												textAlign:'center'
												},
										headerStyle: {
												backgroundColor: '#AFAFAF',
												color: '#FFF',
												fontSize : '15px',
												fontWeight : 'bold',
												width: 80,
												maxWidth: 80,
												padding:8,
												textAlign:'center',
												whiteSpace: 'normal',
												wordWrap: 'break-word',
										},
								}}
								columns={[
										
										{ title: 'Department', field: 'department' , sorting:false ,
											cellStyle: { 
												width: 50,
												maxWidth: 200,
												padding:5,
												textAlign:'center',
											},
											headerStyle:{ 
												backgroundColor: '#AFAFAF',
												color: '#FFF',
												fontSize : '15px',
												fontWeight : 'bold',
												minWidth: 100,
												maxWidth: 200,
												padding:8,
												textAlign:'center'
											}  
										},
										{ title: 'Number of EMP', field: 'manpowers', sorting:false  },
										{ title: 'w@o', field: 'w@o', sorting:false  }, 
										{ title: 'wfh', field: 'wfh' , sorting:false },
										{ title: 'sick', field: 'sick', sorting:false },
										{ title: 'other', field: 'other', sorting:false },
										{ title: 'Checked in', field: 'total_check_in', sorting:false },
										{ title: "Haven't Checked in", field: 'not_check_in', sorting:false },

								]}
								data={Data}     
						/>
					
				</div>
			</Paper>
		)
			
	};
export default TableDepartment