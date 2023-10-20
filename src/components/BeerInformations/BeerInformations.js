import React from "react";
import "../BeerInformations/BeerInformation.css";

function Beerinformation({ beer, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
        <div className="titles">{beer.name}</div>
        <div className="modal-content">
          <div>
            <img src={beer.image_url} alt={beer.name} />
          </div>
          <div>
            <p>
              <span className="bold-label">ABV:</span> {beer.abv}
            </p>
            <p>
              <span className="bold-label">Attenuation Level:</span>{" "}
              {beer.attenuation_level}
            </p>
            <p>
              <span className="bold-label">Brewer's Tips:</span>{" "}
              {beer.brewers_tips}
            </p>
            <p>
              <span className="bold-label">Food Pairing:</span>{" "}
              {beer.food_pairing.map((food, index) => (
                <span key={index}>
                  <br />- {food}
                </span>
              ))}
            </p>
            <p>
              <span className="bold-label">Volume:</span> {beer.volume.value}{" "}
              {beer.volume.unit}
            </p>
            <p>
              <span className="bold-label">Tagline:</span> {beer.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Beerinformation;
