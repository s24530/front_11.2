import React from "react";

const MealList = ({ meals, onMealClick }) => {
  return (
    <div>
      {meals.map((meal) => (
        <div key={meal.idMeal} onClick={() => onMealClick(meal)}>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <h3>{meal.strMeal}</h3>
        </div>
      ))}
    </div>
  );
};

export default MealList;
