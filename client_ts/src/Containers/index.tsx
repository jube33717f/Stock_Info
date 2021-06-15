/**
 * file: Project Container file
 * date: 2021-06-11
 * author: Jubi
 * lastModify: Jubi 2021-06-11
 */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Nav from '../Components/Nav'
import style from './style.module.scss'

const Containers =  (props:{children:JSX.Element})=>{

    return (<>
        <CssBaseline />
        <Nav/>
        <Container maxWidth="lg" className={style.box}>
        <Typography component="div" className={style.container} >
            {props.children}
        </Typography>
        </Container>
    </>)
}
export default Containers;