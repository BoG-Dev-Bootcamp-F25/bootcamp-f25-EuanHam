import React, { useState, useEffect } from 'react';
import { getPokemonJSON } from '../server/pokemon';
import './PokemonInfo.css';

function PokemonInfo() {
  const [activeTab, setActiveTab] = useState<'info' | 'moves'>('info');
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonJSON(1); // Start with Bulbasaur
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
        <p>special-attack: {pokemonData.stats[3].base_stat}</p>
        <p>special-defense: {pokemonData.stats[4].base_stat}</p>
        <p>speed: {pokemonData.stats[5].base_stat}</p>
    </div>
  );

  const renderMoves = () => (
    <div>
      <p><strong>Moves:</strong></p>
      {pokemonData.moves.map((move: any, index: number) => (
        <p key={index}> {move.move.name}</p>
      ))}
    </div>
  );

  return (
    <div>
              
      <div className="content-area">
        {activeTab === 'info' ? renderInfo() : renderMoves()}
      </div>
      <div className="container">
        <div className="column columnButton-container">
          <button 
            onClick={() => setActiveTab('info')}
            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          >
            Info
          </button>
        </div>
        <div className="column columnButton-container">
          <button 
            onClick={() => setActiveTab('moves')}
            className={`tab-button ${activeTab === 'moves' ? 'active' : ''}`}
          >
            Moves
          </button>
        </div>
      </div>

    </div>
  );
}

export default PokemonInfo;