import React from 'react';
import './PokemonImage.css';

interface PokemonImageProps {
  pokemonData: any;
  loading: boolean;
}

const typeColors: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

function PokemonImage({ pokemonData, loading }: PokemonImageProps) {
  if (loading) {
    return (
      <div>
        <p>Loading Pokemon...</p>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div>
        <p>Error loading Pokemon</p>
      </div>
    );
  }

  return (
    <div className="pokemon-display">
      <div className="pokemon-image-container">
        <img 
          src={pokemonData.sprites.front_default} 
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </div>
      <div className="pokemon-name">
        {pokemonData.name}
      </div>
      <div className="pokemon-types">
        <p>Types:</p>
        <div className="type-badges">
          {pokemonData.types.map((type: any, index: number) => (
            <span 
              key={index}
              className="type-badge"
              style={{ backgroundColor: typeColors[type.type.name] || '#68A090' }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonImage;