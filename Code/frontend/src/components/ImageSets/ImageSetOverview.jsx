import React, { useState, useEffect, Fragment, useCallback } from 'react'

import axios from 'axios' 
import PropagateLoader from 'react-spinners/PropagateLoader';
import { css } from '@emotion/core';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { ImageSet } from './ImageSet'
const override = css`
left: 50%;
`;

const IMAGE_SETS =[
	{
		id: 1,
		name: "test1"
	},
	{
		id: 2,
		name: "test2"
	},
	{
		id: 3,
		name: "test3"
	}

]


const ImageSetOverview = () => {

	const loadNextImage = () => {return }
	
	useEffect(() => {
		loadNextImage();
	}, [loadNextImage]);
		
	return (
		<Fragment>
            <Box className = 'label-image-header'>
                    Image Sets
            </Box>
            <Box>
				{
					IMAGE_SETS.map( imageSet =>{ 
						return <ImageSet imageSet={imageSet}/>
					})
				}
            </Box>
		</Fragment>
  	)
}

export default ImageSetOverview