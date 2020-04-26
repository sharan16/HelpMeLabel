import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const authPages = ["/login", "/signup"]
const landingPages = ["/"]

const useStyles = makeStyles((theme) => ({
  	root: {
    	flexGrow: 1,
  	},
  	button: {
    	marginLeft: "1%"
  	},
  	title: {
    	flexGrow: 1,
  	},
}));

const Navbar = () => {
  
  	let location = useLocation().pathname
  
  	const classes = useStyles();

	const navLinks = authPages.includes(location) ? (
		<Fragment/>
	  ) : landingPages.includes(location) ? (
		<Fragment>
			<Button className ={ classes.button} variant="contained" href="/signup">Sign Up</Button>
			<Button className = {classes.button} variant="contained" href="/login">Login</Button>
  		</Fragment>
	  ) : ( 
    	<Fragment>
     		<Button className = {classes.button} variant="contained" href="/settings">Settings</Button>
      		<Button className = {classes.button} variant="contained" href="/logout">Logout</Button>
    	</Fragment>
	  )
  
  	return (
    	<AppBar position="static">
      		<Toolbar>
        		<Typography variant="h4" className={classes.title}>
          			HelpMeLabel
        		</Typography>
        		{navLinks}
      		</Toolbar>
    	</AppBar>
  	)
}

export default Navbar