import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios' 
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";

const ImageLabeler = () => {

	let [imageURL, setImageURL] = useState("")
  	let [loading, setLoading] = useState(true)

	const override = css`
		position: absolute;
		top: 30%;
		left: 50%;
	`;


	useEffect(async () => {
		let res = await axios.get('api/images/get_unlabeled_image/')
		setImageURL(res.data.image_url)
		setLoading(false)
	}, []);

	return (
		<Fragment>
			<div className = "label-image-header">
				<h1>
					Label This Image
				</h1>
			</div>
			{ loading ?
				<PropagateLoader 
				css={override}
				size={20}
				color={"#5197e6"}
				/>
			:
				<div className = "label-image">
					<img src = {imageURL} width="42%" height="42%"/>
				</div>
			}
		</Fragment>
  	)
}

export default ImageLabeler