import React, { useState, useEffect, Fragment, useCallback } from 'react'
import axios from 'axios' 
import PropagateLoader from 'react-spinners/PropagateLoader';
import { css } from '@emotion/core';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const ImageLabeler = () => {

	let [imageURL, setImageURL] = useState('')
  	let [loading, setLoading] = useState(true)

	const override = css`
		left: 50%;
	`;

	const useStyles = makeStyles(theme => ({
		root: {
			maxHeight: 450,
			display: 'flex',
		  flexDirection: 'column',
		  justifyContent: 'center'
		},
		naviagateNext:{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
		}
	  }));

	  const loadNextImage = useCallback(async() => {
		  setLoading(true)
		  let res = await axios.get('api/images/get_unlabeled_image/')
		  setImageURL(res.data.image_url)
		  setLoading(false)
		},[setLoading,setImageURL])
		
		const handleNavigateNext = useCallback(() => {
			loadNextImage()
		}, [loadNextImage])
		
		const classes = useStyles();
		
		useEffect(() => {
			loadNextImage()
		}, [loadNextImage]);
		
	return (
		<Fragment>
			<Grid container>
				<Grid item xs={12}>
					<div className = 'label-image-header'>
						<h1>
							Label This Image
						</h1>
					</div>
        		</Grid>
				<Grid xs={4} />
				<Grid className = {classes.root} item xs={4}>
						{ loading ?
							<PropagateLoader 
								css={override}
								size={20}
								color={'#5197e6'}
							/>
						:
							<Grow in ={true} timeout= {1000}>
								<div className = 'label-image'>
									<img className = 'responsive-image' alt='label this' src = {imageURL}/>
								</div>
							</Grow>
						}
        		</Grid>
				<Grid className = {classes.naviagateNext} item xs={1}>
					<Container>
						<IconButton color='primary' alt='next' aria-label='view next image' onClick = {() => {handleNavigateNext()}}>
							<NavigateNextIcon />
						</IconButton>
					</Container>
        		</Grid>
			</Grid>
		</Fragment>
  	)
}

export default ImageLabeler