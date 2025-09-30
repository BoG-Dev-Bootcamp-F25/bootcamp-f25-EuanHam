import React, { useState, useEffect } from 'react';
import { getPokemonJSON } from '../server/pokemon';
import './PokemonImage.css';

function PokemonImage() {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonJSON(1);
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading Pokemon...</p>
      </div>
    );
  }

  return (
    <div>
      <img 
        src={pokemonData.sprites.front_default} 
        alt={pokemonData.name}
        className="pokemon-image"
      />
      <p>{pokemonData.name}</p>
      <p>Type(s): {pokemonData.types.map((type: any) => type.type.name)}</p>
    </div>
  );
}

export default PokemonImage;