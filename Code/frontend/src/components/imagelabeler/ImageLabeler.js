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

import ImageButtons from "./ImageButtons"

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

const ImageLabeler = () => {

	const [imageURL, setImageURL] = useState('');
	const [imageId, setImageId] = useState(-1);
	const [loading, setLoading] = useState(true);
	const [possibleLabels, setPossibleLabels] = useState([]);

	const onSelect = possibleLabel => event => {
		console.log(possibleLabel);
		axios.post('api/images/label_image/',{image_id: imageId, label: possibleLabel});
		loadNextImage();
	}

	const loadNextImage = useCallback(async() => {
		setPossibleLabels([]);
		setLoading(true);
		let res = await axios.get('api/images/get_unlabeled_image/')
		setImageURL(res.data.image_url);
		setImageId(res.data.id);
		setPossibleLabels(res.data.possible_labels);
		setLoading(false);
	},[setLoading, setImageURL, setPossibleLabels, setImageId]);

	const handleNavigateNext = useCallback(() => {
		loadNextImage();
	}, [loadNextImage]);
	
	const classes = useStyles();
	
	useEffect(() => {
		loadNextImage();
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
			<ImageButtons possibleLabels={possibleLabels} onSelect={onSelect}/>
		</Fragment>
  	)
}

export default ImageLabeler