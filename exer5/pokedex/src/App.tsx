import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonImage from './components/PokemonImage';
import NavigationButtons from './components/NavigationButtons';
import PokemonInfo from './components/PokemonInfo';
import { getPokemonJSON } from './server/pokemon';

function App() {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [currentPokemonId, setCurrentPokemonId] = useState(1);
  const [loading, setLoading] = useState(true);
  const MAX_POKEMON_ID = 1010; // Current max Pokemon in API

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const data = await getPokemonJSON(currentPokemonId);
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPokemonId]);

  const handlePrevious = () => {
    if (currentPokemonId > 1) {
      setCurrentPokemonId(currentPokemonId - 1);
    }
  };

  const handleNext = () => {
    if (currentPokemonId < MAX_POKEMON_ID) {
      setCurrentPokemonId(currentPokemonId + 1);
    }
  };

  return (
    <>
      <h1>Exercise 5 - Pokedex!</h1>
      <div className="container">
        <div className="column">
          <PokemonImage pokemonData={pokemonData} loading={loading} />
          <NavigationButtons 
            onPrevious={handlePrevious} 
            onNext={handleNext}
            canGoPrevious={currentPokemonId > 1}
            canGoNext={currentPokemonId < MAX_POKEMON_ID}
          />
        </div>
        <div className="column">
          <PokemonInfo pokemonData={pokemonData} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default App;
