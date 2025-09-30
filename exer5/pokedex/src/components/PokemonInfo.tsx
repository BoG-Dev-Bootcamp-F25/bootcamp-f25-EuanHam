import React, { useState, useEffect } from 'react';
import { getPokemonJSON } from '../server/pokemon';

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
      <p><strong>Height:</strong> {pokemonData.height / 10} m</p>
      <p><strong>Weight:</strong> {pokemonData.weight / 10} kg</p>
      <p><strong>HP:</strong> {pokemonData.stats[0].base_stat}</p>
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
      <div className="container">
        <div className="column">
          <button onClick={() => setActiveTab('info')}>
            Info
          </button>
        </div>
        <div className="column">
          <button onClick={() => setActiveTab('moves')}>
            Moves
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'info' ? renderInfo() : renderMoves()}
      </div>
    </div>
  );
}

export default PokemonInfo;