import React,{useState,useEffect,forwardRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector,useDispatch } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

import LineChart from './charts/Depart_line.js';
import PieChart from './charts/Depart_pie.js';
import PieChart2 from './charts/Depart_pie2.js';
import CardChart from './charts/Depart_card.js';

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
		const dataLogin = useSelector(state => state.report.dataLogin);

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
		
			const date = `${mo} ${ye}` ;
			// console.log(date)
			monthList.push({ label: date, value: element}) 
		});
		let [ selMonth, setSelMonth ] = useState({ label: monthList[0].label, value:monthList[0].value});

		//data chart
		const [dataPie,setDataPie] =useState({data:[]});
		const [dataPie2,setDataPie2] =useState({data:[]});
		const [dataLine,setDataLine] =useState({data:[]});

		useEffect(() => {
			axios.post('https://ctx-core.central.tech/report-api/public/index.php/date', {
				month : selMonth.value
				}).then(res => {
					dispatch({ type: 'setArrDate' ,payload:res.data.date });
					// console.log(res.data);
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
			// console.log(date.value.toString());

			axios.post('https://ctx-core.central.tech/report-api/public/index.php/department/pie_chart', {
				month : selMonth.value,
				department : dataLogin[0].department
				}).then(res => {
					setDataPie2({data:res.data});
					// console.log(res);
					// console.log(res.data);
			});

			axios.post('https://ctx-core.central.tech/report-api/public/index.php/department/line_chart', {
				month : selMonth.value,
				department : dataLogin[0].department
				}).then(res => {
					setDataLine({data:res.data});
					// console.log(res);
					// console.log(res.data);
			});

			axios.post('https://ctx-core.central.tech/report-api/public/index.php/department/table_chart', {
				month : selMonth.value,
				department : dataLogin[0].department
				}).then(res => {
					setDataPie({data:res.data});
					// console.log(res);
					// console.log(res.data);
			});
			
		},[selMonth]);

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
					alignItems: 'center',
					paddingLeft: 10,
					width:'120px',
					paddingTop:'.5%',
					textAlign:'left',
					height:'40px',
					fontSize:16,
					fontWeight:'bold',
					
					
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
							onChange={(e) => { setSelMonth(e);setTableTitle('Please select date again.'); setDate({ label: "", value:""})}}
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
								<PieChart {...dataPie}/>
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
								<CardChart {...dataPie}/>
							</div>                
							<div 
								style={{
									width:"100%",
									// paddingTop:"10px",
								}}
							>
								<PieChart2 {...dataPie2}/>
							</div>
						</div>
					</div>
					{/* container bottom */}
					<div 
						style={{
							display: 'flex',
							width:"100%",
							paddingBottom:'10px',
							paddingLeft:'10px',
							paddingRight:'10px',
						}}
					>
						<LineChart {...dataLine}/>
					</div>
							
				</div>
				
			</Paper>
		)
			
	};
export default TableDepartment