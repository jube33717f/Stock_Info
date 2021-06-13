/**
 * file: Project Navigation Component
 * date: 2021-06-11
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
import React,{ useState } from 'react'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import style from './style.module.scss'
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import { Link } from 'react-router-dom';
 /* <------------------------------------ **** Style component **** ------------------------------------ */
const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
      
    },
  }));

const Nav = ()=>{
     /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const classes = useStyles();
    const [ showPhoneView, setShowPhoneView ] = useState(false)
    const [ anchorEl, setAnchorEl] = useState(null);
    const [ open, setOpen ] = useState(false)
     /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
     /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /** mouse over handler*/
     const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen(true)
    };
    /** mouse over close handler*/
    const handlePopoverClose = () => {
      setAnchorEl(null);
      setOpen(false)
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
    <div className={style.nav}>
        <div className={style.logo}>
            <span>
                <MultilineChartIcon style={{'fontSize' : '2em'}}/>
            </span>StockInfo.
        </div>
        <div className={style.content}>
            <nav>
                <Link to='/'>Dashboard</Link>
                <Link to='/subscribe'>Subscribes</Link>
            </nav>
        </div>
        <div className={style.auth}>
        {sessionStorage.getItem("name") == null?<Link to='/login'><div>Login</div></Link>:<>
        <div 
         aria-owns={open ? 'mouse-over-popover' : undefined}
         aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={()=>{
            sessionStorage.clear()
        }}
        >Hi,{sessionStorage.getItem("name")}</div>
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
            paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Typography>Click to log out</Typography>
        </Popover>
        </>}
        </div>
        <button>
            <div 
            className={style.lineContainer}
            onClick={()=>{setShowPhoneView(true)}}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
    </div>
    {showPhoneView&&<div className={style.phoneNav}>
        <div className={style.phoneNavHeader}>
                <MultilineChartIcon style={{'fontSize' : '2.8em'}}/>
                <button onClick={()=>{setShowPhoneView(false)}}>
                    <span></span>
                    <span></span>
                </button>
        </div>
        <div 
        className={style.phoneNavContent}
        onClick={()=>{setShowPhoneView(false)}}
        >
            <nav>
                <Link to='/'>Dashboard</Link>
                <Link to='/subscribe'>Subscribes</Link>
            </nav>
        </div>
        <div className={style.phoneNavFooter}>
            {sessionStorage.getItem("name") == null?<Link to='/login'><div>Login</div></Link>:<div>Hi,{sessionStorage.getItem("name")}</div>}
        </div>
    </div>}
    </>)
}
export default Nav;