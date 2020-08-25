import React,{useEffect,useState} from "react";
import { useDispatch ,useSelector} from 'react-redux'
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MicrosoftLogin from "react-microsoft-login";

import axios from "axios";
import cto from '../images/cto.jpg'

// import ClearCache from "react-clear-cache";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        maxWidth:'450px',
        maxHeight:'720px',
        alignContent:'center',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:'250px',
        marginBottom:'250px',
    },
    
    loginBtn: {
        marginTop: theme.spacing(2),
        flexGrow: 1
    }

  }),
);



const FormPage = () => {
    // const lineID = useSelector(state => state.user.lineID);
    // const displayName = useSelector(state => state.user.displayName);
    // const picURL = useSelector(state => state.user.picURL);
    // let [isLoading,setIsLoading] = useState(null);
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [empID, setEmpID] = useState('');
    const [surname, setSurname] = useState('');
    // const [shopcode, setShopcode] = useState('');
    const [helperText, setHelperText] = useState('');
    // const [UserDetail, setUserDetail] = useState({"rs": []});
    // let [LoadRegis, setLoadRegis] = useState('');

    const dispatch = useDispatch()
    const id = 'e79f4b1c-4a14-442b-9e32-b9ff1b7f4955'
    
    useEffect(() => {
        if (empID.trim() && surname.trim() ) {
            setIsButtonDisabled(false);
            
        } else {
            setIsButtonDisabled(true);
        }
        
    }, [empID,surname]);

    const authHandler = (err, data) => {
        if(data == undefined){

        }else{
            getRepAPI(data.authResponseWithAccessToken.idToken.claims.preferred_username);
            // console.log(err, "Data : "+ JSON.stringify(data.authResponseWithAccessToken.idToken.claims.preferred_username));
        }
        
    }

    async function getRepAPI(username){
        await axios.post('https://ctx-core.central.tech/report-api/public/index.php/user/detail', {
                email : username 
              }).then(res => {
                if(res.data[0].status=="success"){
                    dispatch({ type: 'setDataLogin' ,payload:res.data });
                    // console.log(res.data);
                }
                // alert("");
                setOpen(true);
                setHelperText("Incorrect email, Please sign in with the central.tech account");
                // console.log(res.data.text);
        });
    }
 

    const handleClose = () => {
        setOpen(false);
    };

    
        return (
            <div className={classes.root}>
                
                <div className="px-0 m-3" id="logInPage" style={{ fontFamily: "Prompt" }}>
                
                    <div className="card border-light shadow mt-2">
                    
                    <div className="card-body text-center">
                        
                        <h5 className="card-title text-dark">
                        
                        
                        </h5>
                        <div className="text-center mb-3">
                        <img
                            src={cto}
                            width="200"
                            height="150"
                            className="d-inline-block align-top"
                            alt="cto"
                        />

                        {/* <h5 className="lead">{displayName}</h5> */}
                        </div>
                        <div className="my-2">
                        {/* <small className="text-center text-secondary">
                            <p>
                            กรอกข้อมูลเพื่อยืนยันการเข้าใช้งาน โดยบัญชี Line
                            จะผูกเข้ากับรหัสพนักงานเพื่อความสะดวกในการเข้าใช้งานครั้งต่อไป
                            </p>
                        </small> */}
                        </div>
                        <div>
                        <form  className="px-2">
                            
                            <div>
                                <MicrosoftLogin clientId={id} authCallback={authHandler} prompt={'select_account'}/>
                            </div>
                           
                        </form>
                        
                        </div>
                        <div />
                    </div>
                    </div>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"เกิดข้อผิดพลาดในการลงทะเบียน"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {helperText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            รับทราบ
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>

        
        );
    

};
export default FormPage;