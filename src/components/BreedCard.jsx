import React from "react";

const BreedCard = (props) => {
  const breed = props.breed;
  console.log(breed);
  const baseUrl = "https://cdn2.thedogapi.com/images/";
  const finalUrl = `${baseUrl}${breed.reference_image_id}.jpg`;
  return (
    <>
      <div className="row">
        <h1>{breed.name}</h1>
        <div className="col-sm-1">
          <img src={finalUrl} alt={breed.name} width="100" height="100"></img>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-2">{breed.bred_for}</div>
        <div className="col-sm-2">{breed.breed_group}</div>
        <div className="col-sm-2">{breed.life_span}</div>
        <div className="col-sm-2">{breed.temperament}</div>
      </div>
    </>
  );
};

export default BreedCard;
