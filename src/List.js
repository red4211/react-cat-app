import React from "react";

function List(props) {
	const renderList = props.list.map((elem, index) => {
		return (
			<option key={index} value={elem.id}>
				{elem.name}{" "}
			</option>
		);
	});

	return (
		<div className="breed-select" >
			Show info about breed:{" "}
			<select
				onChange={e => {
					props.showBreed(e);
				}}
			>
				{renderList}
			</select>
		</div>
	);
}

export default List;
