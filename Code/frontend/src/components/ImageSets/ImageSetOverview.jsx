import React, { useState, useEffect, Fragment, useCallback } from 'react'

import axios from 'axios' 
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ImageSet from './ImageSet'
import AddCircleIcon from '@material-ui/icons/AddCircle';


const ImageSetOverview = () => {
	const [imageSets, setImageSets] = useState([]);
	const loadImageSets = useCallback(async() => {
		let res = await axios.get('api/imagesets/')
		setImageSets(res.data)
	},[setImageSets]);
	
	useEffect(() => {
		loadImageSets();
	}, [loadImageSets]);
		
	return (
		<Fragment>
            <Box className = 'label-image-header'>
                    <h1>Image Sets</h1>
            </Box>
			<Box display="flex" flexDirection="row">
				<Box display='inline-block'>
					<Box display="flex" flexDirection="row">
						<Box p={1} minWidth="120px" border={1}>
							Image Set Id
						</Box>
						<Box p={1} minWidth="200px" border={1}>
							Image Set Name
						</Box>
					</Box>
				</Box>
				<Box>
						<IconButton aria-label="add">
							<AddCircleIcon />
						</IconButton>
				</Box>
			</Box>
			
            <Box width={1/2}>
				{
					imageSets.map( imageSet =>{ 
						return <ImageSet imageSet={imageSet}/>
					})
				}
            </Box>
		</Fragment>
  	)
}

export default ImageSetOverview