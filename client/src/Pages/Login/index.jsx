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

const Login = ()=>{
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const history=useHistory()
    const [addTodo, { data }] = useMutation(LOGIN_USER);
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }; 
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (<Container>
        <div className={style.login}>
            
            <StockCard >
            <h1>Welcome back</h1>
        <form className={style.loginForm} onSubmit={async()=>{
            addTodo({ variables: { email:values.email,password:values.password } })
            if(data){
                sessionStorage.setItem('userid', data.login.id);
                sessionStorage.setItem('name', data.login.firstName);
                history.replace('/')
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
                            fullWidth
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

    </Container>
    );
    
    
}


export default Login;