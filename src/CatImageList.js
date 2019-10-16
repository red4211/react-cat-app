import React from "react";
function CatImageList(props) {
	const list = props.catImages.map((elem, index) => {
		return (
			<li key={index}>
				<img src={elem.url} alt="" />
			</li>
		);
	});
	return (
		<div>
			<button onClick={props.showNextPage}>More cat images</button>
			<ul className="catImageList">{list} </ul>
		</div>
	);
}

export default CatImageList;
