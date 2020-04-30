import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';




const ImageSet = ({ imageSet }) => {
    
	return (
		<Box display="flex" flexDirection="row">
            <Box p={1} minWidth="120px" border={1}>
                {imageSet.id}
            </Box>

            <Box p={1} minWidth="200px" border={1}>
               {imageSet.name}
            </Box>

            <IconButton aria-label="edit">
                <EditIcon />
            </IconButton>
		</Box>
  	)
}

export default ImageSet
