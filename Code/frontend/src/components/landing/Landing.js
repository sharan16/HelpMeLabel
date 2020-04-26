import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    title: {
        textAlign: "center",
        paddingTop: "20%"
    },
    button: {
        margin: "1%"
    }
})

const Landing = () => {

    const classes = useStyles();

	return (
        <Box className={classes.title}>
            <h1>
                Help Me Label Landing Page
            </h1>
            <Button className={classes.button} variant="outlined" color="primary" href="/signup">Sign Up</Button>
            <Button className={classes.button} variant="outlined" color="primary" href="/login">Login</Button>
        </Box>
  	)
}

export default Landing