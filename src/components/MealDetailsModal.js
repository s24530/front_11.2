import React, { useState } from "react";

const MealDetailsModal = ({ meal, onClose }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  if (!meal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <p>{meal.strInstructions}</p>
        <span>Rating</span>
        {[1, 2, 3, 4, 5].map((starValue) => (
          <span
            key={starValue}
            className={starValue <= rating ? "star-filled" : "star-empty"}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        ))}
        {/* Dodaj więcej informacji, jeśli potrzebujesz */}
      </div>
    </div>
  );
};

export default MealDetailsModal;
