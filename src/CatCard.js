import React from "react";
function CatCard(props) {
  if (props.catInfo.length > 0 && props.showCatCard === true) {
    const breedInfo = props.catInfo[0].breeds[0];
    return (
      <div className="cat-card">
        <div className="close" onClick={props.closeCatCard}>
          X
        </div>
        <img src={props.catInfo[0].url} alt="" />

        <div className="cat-card-in">
          <p className="title">{breedInfo.name} </p>
          <p>{breedInfo.description} </p>

          <ul className="info-list">
            <li>
              <b>Lifespan: </b>
              {breedInfo.life_span + " years"}{" "}
            </li>
            <li>
              <b>Weight: </b>
              {breedInfo.weight.metric + " kg"}{" "}
            </li>
            <li>
              <b>Child friendly: </b>
              {breedInfo.child_friendly}{" "}
            </li>
            <li>
              <b>Dog friendly: </b>
              {breedInfo.dog_friendly}{" "}
            </li>
            <li>
              <b>Health issues: </b>
              {breedInfo.health_issues}{" "}
            </li>
            <li>
              <b>Temperament: </b>
              {breedInfo.temperament}{" "}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default CatCard;
