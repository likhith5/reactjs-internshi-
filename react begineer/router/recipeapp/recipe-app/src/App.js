import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const RecipeApp = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [category, setCategory] = useState("all");

  const searchRecipes = async () => {
    try {
      const response = await axios.get(`https://webknox-recipes.p.rapidapi.com/recipes/visualizeIngredients'`, {
        params: {
          query: query,
          apiKey: "52c2eb3079msh923204a2c2e1158p11e837jsn0bc86c535376", // Replace with your API key
          number: 6,
        },
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const saveRecipe = (recipe) => {
    setSavedRecipes([...savedRecipes, recipe]);
  };

  const filterRecipes = () => {
    if (category === "all") return savedRecipes;
    return savedRecipes.filter((recipe) => recipe.category === category);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="recipe-app">
      <h1>Recipe App</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
         img src={`D:/assignments/recipeapp/recipe-app/public/images/7899036.jpg/${recipe.id} 023-312x231.jpg`}/>    
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for recipes..."
        <button onClick={searchRecipes}>Search</button>
      </div>

      <div className="category-filter">
        <button onClick={() => handleCategorySelect("all")}>All</button>
        <button onClick={() => handleCategorySelect("breakfast")}>Breakfast</button>
        <button onClick={() => handleCategorySelect("lunch")}>Lunch</button>
        <button onClick={() => handleCategorySelect("dinner")}>Dinner</button>
      </div>

      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={`/${recipe.id}-312x231.jpg`} alt={recipe.title} />
            <button onClick={() => saveRecipe({ ...recipe, category: category })}>Save Recipe</button>
          </div>
        ))}
      </div>

      <h2>Saved Recipes</h2>
      <div className="saved-recipes">
        {filterRecipes().map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={`${recipe.id}-312x231.jpg`} alt={recipe.title} />
            <p>Category: {recipe.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeApp;
