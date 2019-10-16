import React from "react";
function CategoryFilter(props) {
  const categoriesList = props.categories.map((elem, index) => {
    return (
      <option key={index} value={elem.id}>
        {elem.name}{" "}
      </option>
    );
  });

  return (
    <div className="category-filter" >
      Image category:{" "}
      <select onChange={props.setCategory}>
        <option value="">None</option>
        {categoriesList}
      </select>
    </div>
  );
}
export default CategoryFilter;
