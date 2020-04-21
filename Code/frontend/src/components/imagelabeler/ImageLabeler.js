import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios' 
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const ImageLabeler = () => {

	let [imageURL, setImageURL] = useState("")
  	let [loading, setLoading] = useState(true)

	const override = css`
		left: 50%;
	`;

	const useStyles = makeStyles(theme => ({
		root: {
		  height: 450,
		  display: "flex",
		  flexDirection: "column",
		  justifyContent: "center"
		},
		naviagateNext:{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		}
	  }));

	useEffect(async () => {
		loadNextImage()
	}, []);

	let handleNavigateNext =  () => {
		loadNextImage()
	}

	let loadNextImage = async() => {
		setLoading(true)
		let res = await axios.get('api/images/get_unlabeled_image/')
		setImageURL(res.data.image_url)
		setLoading(false)
	}

	const classes = useStyles();

	return (
		<Fragment>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<div className = "label-image-header">
						<h1>
							Label This Image
						</h1>
					</div>
        		</Grid>
				<Grid item xs={4}>
					<div>
					</div>
        		</Grid>
				<Grid className = {classes.root} item xs={4}>
					{ loading ?
						<PropagateLoader 
						css={override}
						size={20}
						color={"#5197e6"}
						/>
					:
						<Grow in ={true} timeout= {1000}>
						<div className = "label-image">
							<img className = "responsive-image" src = {imageURL}/>
						</div>
						</Grow>
					}
        		</Grid>
				<Grid className = {classes.naviagateNext} item xs={1}>
					<IconButton color="primary" aria-label="view next image" onClick = {() => {handleNavigateNext()}}>
						<NavigateNextIcon />
					</IconButton>
        		</Grid>
			</Grid>
		</Fragment>
  	)
}

export default ImageLabeler