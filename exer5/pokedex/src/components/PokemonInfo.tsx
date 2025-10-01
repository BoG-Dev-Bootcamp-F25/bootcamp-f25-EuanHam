import React, { useState } from 'react';
import './PokemonInfo.css';

interface PokemonInfoProps {
  pokemonData: any;
  loading: boolean;
}

function PokemonInfo({ pokemonData, loading }: PokemonInfoProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'moves'>('info');

  if (loading) {
    return (
      <div>
        <p>Loading Pokemon info...</p>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div>
        <p>Error loading Pokemon info</p>
      </div>
    );
  }

  const renderInfo = () => (
    <div>
      <p>height: {pokemonData.height / 10}m</p>
      <p>weight: {pokemonData.weight / 10}kg</p>
      <p>hp: {pokemonData.stats[0].base_stat}</p>
      <p>attack: {pokemonData.stats[1].base_stat}</p>
      <p>defense: {pokemonData.stats[2].base_stat}</p>
      <p>special-attack: {pokemonData.stats[3].base_stat}</p>
      <p>special-defense: {pokemonData.stats[4].base_stat}</p>
      <p>speed: {pokemonData.stats[5].base_stat}</p>
    </div>
  );

  const renderMoves = () => (
    <div>
      {pokemonData.moves.map((move: any, index: number) => (
        <p key={index}> {move.move.name}</p>
      ))}
    </div>
  );

  return (
    <div className="pokemon-info-container">
      <h2>{activeTab === 'info' ? 'Info' : 'Moves'}</h2>
      
      <div className="content-area">
        {activeTab === 'info' ? renderInfo() : renderMoves()}
      </div>
      
      <div className="tab-buttons-container">
        <button 
          onClick={() => setActiveTab('info')}
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
        >
          Info
        </button>
        <button 
          onClick={() => setActiveTab('moves')}
          className={`tab-button ${activeTab === 'moves' ? 'active' : ''}`}
        >
          Moves
        </button>
      </div>
    </div>
  );
}

export default PokemonInfo;