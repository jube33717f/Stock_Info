/**
 * file: Login Page
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-13
 */
import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import Container from '../../Containers'
import style from './style.module.scss'
import { gql, useMutation} from '@apollo/client';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import StockCard from '../../Components/StockCard'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps }  from '@material-ui/lab/Alert';
/* <------------------------------------ **** GRAPH QUERY START **** ------------------------------------ */
const LOGIN_USER = gql`
    mutation LOGIN(
        $email: String!
        $password: String!
        ) {
        login(email: $email, password:$password) {
            firstName
            lastName
            email
            id
        }
    }
`;
/* <------------------------------------ **** GRAPH QUERY END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
interface State {
    email: string;
    password: string;
    showPassword: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** STYLE COMPONENT START **** ------------------------------------ */
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      marginTop:'3rem',
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);
/* <------------------------------------ **** STYLE COMPONENT START **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Login = ()=>{
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });
    const history=useHistory()
    const [addTodo, { data }] = useMutation(LOGIN_USER);
    const [open, setOpen] = useState(false);
    const [success , setSuccess] = useState(false)
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    }; 
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const handleClose = (event?: React.SyntheticEvent,reason?:string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (<Container>
        <>
        <div className={style.login}>
            
            <StockCard >
            <h1>Welcome back</h1>
        <form className={style.loginForm} onSubmit={async()=>{
            addTodo({ variables: { email:values.email,password:values.password } })
            if(data&&data.login && data.login.id){
                setOpen(true)
                setSuccess(true)
                sessionStorage.setItem('userid', data.login.id);
                sessionStorage.setItem('name', data.login.firstName);
                history.replace('/')
            }else{
                setOpen(true)
                setSuccess(false)
            }
            
        }}>
                <div className={style.loginFormInputGroup}>
                    <div className={style.formInput}>
                        
                    
                    <FormControl className={style.formInputBox} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                            fullWidth
                            label="Email"
                            id="outlined-adornment-email"
                            className={style.formInputBox}
                            value={values.email}
                            onChange={handleChange('email')}
                            labelWidth={70}
                            />
                            </FormControl>
                    <FormControl className={style.formInputBox} variant="outlined">
                        
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <ColorButton variant="contained" color="primary" type='submit'>
                                    LOGIN
                    </ColorButton>
                    </div> 
                </div>
                
            </form>
            </StockCard>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {success?<Alert onClose={handleClose} severity="success">
                Login successfully!
            </Alert>:<Alert onClose={handleClose} severity="error">
                Please check your password or account!
            </Alert>}
        </Snackbar>
        </>
    </Container>
    );
    
    
}


export default Login;