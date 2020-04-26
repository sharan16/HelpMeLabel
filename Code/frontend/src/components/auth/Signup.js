import React from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint, Person } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    margin: {
        marginTop: "10%",
        marginLeft: "25%",
        marginRight: "25%"
    },
    padding: {
        padding: theme.spacing.unit
    },
    loginTitle: {
        textAlign: "center",
        margin: "5%"
    },
    button: {
        textTransform: "none"
    },
    login: {
        marginTop: "5%",
    }
}))

const Signup = () => {

    const classes = useStyles();

	return (
        <div className={classes.margin}>
            <div className ={classes.loginTitle}>
                <h3 >
                    SIGN UP
                </h3>
            </div>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <Person />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                    <TextField id="name" label="Full Name" type="text" fullWidth autoFocus required />
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <Person />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                    <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <Fingerprint />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                    <TextField id="password" label="Password" type="password" fullWidth required />
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <Fingerprint />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                    <TextField id="password2" label="Confirm Password" type="password" fullWidth required />
                </Grid>
            </Grid>
            <Grid container justify="center" className = {classes.login}>
                <Button className = {classes.button}  href="/label" variant="outlined" color="primary">Sign Up</Button>
            </Grid>
        </div>
  	)
}

export default Signup;