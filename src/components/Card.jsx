import React from "react";
import "../assets/styles/card.css";

const Carder = ({ ads }) => {
  const displayName = ads.wallName || "No Name";
  const availableFrom = new Date(ads.availableFrom);
  const availableTo = new Date(ads.availableTo);
  const duration = Math.ceil((availableTo - availableFrom) / (1000 * 60 * 60 * 24));

  return (
    <div className="head">
      <div className="image-content-row">
        <div className="card-img-container">
          <a href={`/ad-details/${ads._id}`}>
            <img src={ads.imageUrl} alt={displayName} className="card-img" />
          </a>
        </div>

        <div className="card-content">
          <a href={`/ad-details/${ads._id}`} className="ads-title">
            <div className="adname">{displayName}</div>
          </a>
          <p className="location">{ads.location}</p>
          <div className="duration">Duration: {duration} days</div>
          <p className="price">₹{ads.monthlyPrice}</p>
        </div>
      </div>

      <a href={`/ad-details/${ads._id}`} className="viewDetails">
        View Details
      </a>
    </div>
  );
};
export default Carder;
