import React from "react";

const BreedCard = (props) => {
  const breed = props.breed;
  console.log(breed);
  const baseUrl = "https://cdn2.thedogapi.com/images/";
  const finalUrl = `${baseUrl}${breed.reference_image_id}.jpg`;
  return (
    <>
      <h1>{breed.name}</h1>
      <div className="breedcard">
        <img className="breedimage" src={finalUrl} alt={breed.name}></img>
        <div className="breeddetail">
          {breed.bred_for && <div>Bred for: {breed.bred_for}</div>}
          <div>Breed Group: {breed.breed_group}</div>
          <div>Life Span: {breed.life_span}</div>
          <div>Temperament: {breed.temperament}</div>
        </div>
      </div>
    </>
  );
};

export default BreedCard;
