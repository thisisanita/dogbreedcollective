import React from "react";

const Dogs = () => {
  const baseUrl = "https://cdn2.thedogapi.com/images/";
  const finalUrl = `${baseUrl}${props.image}.jpg`;
  return (
    <>
      <div className="row">
        <div className="col-sm-1">
          <img src={finalUrl} alt={props.name} width="80" height="80"></img>
        </div>
        <div className="col-sm-2">{props.name}</div>
        <div className="col-sm-3">{props.bredfor}</div>
        <div className="col-sm-2">{props.lifespan}</div>
        <div className="col-sm-4">{props.temperament}</div>
      </div>
    </>
  );
};

export default Dogs;
