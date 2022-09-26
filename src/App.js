/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react"; 
import Recipe from './recipe';
import './App.css';

const App = () => {
  const APP_ID = `5d292ee0`;
  const APP_KEY = `0d3e747bee69ea48b3901e1d4f8a8c6f`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  

  useEffect(() => {
    (getRecipes(), [query]);
  });

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
  const data = await response.json();
  setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <h1 align="center">Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
      <footer align="center">&copy; Shubham Singh 2022</footer>
    </div>
  );
};

export default App;
