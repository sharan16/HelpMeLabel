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



const ImageSet = ({ imageSet }) => {
    
	return (
		<Box display="flex">
            <Box>
                {imageSet.id}
            </Box>
            <Box>
               {imageSet.name}
            </Box>
		</Box>
  	)
}

export default ImageSet