import React, { useState, useEffect } from "react";
import MealList from "./components/MealList";
import MealDetailsModal from "./components/MealDetailsModal";

const App = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

        if (countryFilter) {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryFilter}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.meals) {
          setMeals(data.meals);
          setError(null);
        } else {
          setMeals([]);
          setError("Brak wyników dla podanej nazwy dania lub kraju.");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        setError(
          "Wystąpił błąd podczas pobierania danych. Spróbuj ponownie później."
        );
      }
    };

    fetchData();
  }, [searchTerm, countryFilter]);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Przepisy Kulinarne</h1>
      <input
        type="text"
        placeholder="Wyszukaj danie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>
        Kraj pochodzenia:
        <input
          type="text"
          placeholder="Wyszukaj po kraju..."
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MealList meals={meals} onMealClick={handleMealClick} />
      {isModalOpen && (
        <MealDetailsModal meal={selectedMeal} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
