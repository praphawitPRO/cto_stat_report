import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';

document.title = 'CTO Work Statistics';

var d = new Date();

d.setDate(d.getDate() - 1);

const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
const date = `${ye}-${mo}-${da}` ;
const month = `${ye}-${mo}` ;

const initialState={
    dataUser:[],
    dataDepartment:[],
    arrDate:[date],
    arrMonth:[month],
    dateSelect:'',
    loading: true,
    dataLogin : {},
}

const Reducer=(state=initialState,action)=>{
    switch (action.type) {
        case "setDataUser":
            state={
                ...state,
                dataUser:action.payload,
            }
        break;

        case "setDataDepartment":
            state={
                ...state,
                dataDepartment:action.payload,
            }
        break;

        case "setArrDate":
            state={
                ...state,
                arrDate:action.payload,
            }
        break;

        case "setArrMonth":
            state={
                ...state,
                arrMonth:action.payload,
            }
        break;

        case "setDateSelect":
            state={
                ...state,
                dateSelect:action.payload,
            }
        break;

        case "setLoading":
            state={
                ...state,
                loading:action.payload,
            }
        break;

        case "setDataLogin":
            state={
                ...state,
                dataLogin:action.payload,
            }
        break;

        case "userLogout":
            state={
                ...state,
                dataLogin:undefined,
            }
        break;
   
        default:
            
    }
    // session: sessionReducer;
    return state;
    
}
const mylogger=(store)=>(next)=>(action)=>{
    console.log("Log action: ",action);
    next(action);
}

const persistConfig = {
    key: 'root',
    storage: storage,
    timeout: 1,
    blacklist: ['state.dataLogin']
  }
  
const persistedReducer = persistReducer(persistConfig, combineReducers({report:Reducer}),{},applyMiddleware(mylogger))

const store = createStore(persistedReducer);
const persistor = persistStore(store);
// sessionService.initSessionService(store);
store.subscribe(()=>{
    console.log("Update Store: ",store.getState());
})

function getRepAPI(month){
    const response = axios.post( 'https://ctx-core.central.tech/report-api/public/index.php/date', {
        month : month
        });
    return response ;
}
function getRepAPI_month(){
    const response = axios.get('https://ctx-core.central.tech/report-api/public/index.php/month' );
    return response ;
}

getRepAPI(month).then(response => 
    store.dispatch({
    type:"setArrDate",
    payload:response.data.date
    })
);

getRepAPI_month().then(response => 
    store.dispatch({
    type:"setArrMonth",
    payload:response.data.date
    })
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
