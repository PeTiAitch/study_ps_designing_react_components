import React from "react";

const SpeakerFavoriteButton = ({ isFavorite, onFavoriteToggle }) => {
  return (
    <div
      onClick={onFavoriteToggle}
      className={isFavorite ? "heartredbutton" : "heartdarkbutton"}
    ></div>
  );
};

export default SpeakerFavoriteButton;
