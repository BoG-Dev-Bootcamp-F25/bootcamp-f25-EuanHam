import React from 'react';
import './App.css';
import PokemonImage from './components/PokemonImage';
import NavigationButtons from './components/NavigationButtons';
import PokemonInfo from './components/PokemonInfo';

function App() {
  return (
    <>
      <h1>Exercise 5 - Pokedex!</h1>
      <div className="container">
        <div className="column">
          <p>this is the left bruh</p>
          <PokemonImage />
          <NavigationButtons />
        </div>
        <div className="column">
          <PokemonInfo />
        </div>
      </div>
    </>
  );
}

export default App;
