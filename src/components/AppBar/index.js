import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { SILENCE_APPEALS, DECISION_APPEALS, LOGIN, RESCRIPTS, WELCOME, REPORTS } from '../../routes';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu'
import { green } from '@material-ui/core/colors';
import { getRole } from '../../utils/request';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    margin: '10px',
    color:'#17a2b8',
    textDecoration:'none',
  }
}));

export default function ButtonAppBar({onLogout}) {
  const classes = useStyles();
  const isCitizen = getRole() === "ROLE_CITIZEN";
  return (
    <div className={classes.root}>
      <AppBar position="static" color={green[400]}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} style={{textDecoration:'none'}} to={RESCRIPTS}>Rescripts</Link>
            <Link className={classes.link} style={{textDecoration:'none'}} to={SILENCE_APPEALS}>Silence Appeals</Link>
            <Link className={classes.link} style={{textDecoration:'none'}} to={DECISION_APPEALS}>Decision Appeals</Link>
            {!isCitizen && <Link className={classes.link} style={{textDecoration:'none'}} to={REPORTS}>Reports</Link>}
          </Typography>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}