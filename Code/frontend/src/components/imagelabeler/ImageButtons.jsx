import React from 'react'

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/box'

const ImageButtons = ({ possibleLabels, onSelect }) => {

	
	return (
		<Box display="flex" justifyContent="center">
            {
                possibleLabels.map(possibleLabel => {
                    return (
                    <Box m={2} key={possibleLabel}>
                        <Button onClick={onSelect(possibleLabel)} variant="contained">{possibleLabel}</Button>
                    </Box>
                    )
            })
            }
		</Box>
  	)
}

export default ImageButtons