import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

  // Handle click event for a card
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card mt-4">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={card.src}
          alt="card front side"
        />
        <img
          className="back"
          src="/img/card-back.png"
          onClick={handleClick}
          alt="card back side"
        />
      </div>
    </div>
  );
};

export default SingleCard;
