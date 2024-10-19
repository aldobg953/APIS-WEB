"use client";

import { useEffect, useState } from 'react';
import styles from './pokedex.module.css';

export default function PokemonPage() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
}, []);
    
  const searchPokemon = async () => {
    if (!pokemonName) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const data = await response.json();
      
      setPokemonList([...pokemonList, {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        height: data.height,
        weight: data.weight,
        types: data.types.map(type => type.type.name),
        showDetails: false
      }]);
      
      setPokemonName('');
    } catch (error) {
      alert("Pokemon not found");
    }
    setLoading(false);
  };

  const toggleDetails = (index) => {
    setPokemonList(pokemonList.map((pokemon, i) => {
      if (i === index) {
        return { ...pokemon, showDetails: !pokemon.showDetails };
      }
      return pokemon;
    }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
                <a className={styles.backHome} href="/">&larr; Back</a>
                <h1 className={styles.title}>Pokedex</h1>
            </header>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Pokémon name"
          className={styles.searchInput}
        />
        <button
          onClick={searchPokemon}
          disabled={loading}
          className={styles.searchButton}
        >
          {loading ? <lord-icon
                    src="https://cdn.lordicon.com/gkryirhd.json"
                    trigger="loop"
                    state="loop-snake-alt"
                    colors="primary:#ffffff"
                >
                </lord-icon> : 'Search'}
        </button>
      </div>

      <div className={styles.pokemonGrid}>
        {pokemonList.map((pokemon, index) => (
          <div key={`${pokemon.name}-${index}`} className={styles.pokemonItem}>
            <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            
            {!pokemon.showDetails ? (
              <img
                src={pokemon.image}
                className={styles.pokemonImage}
              />
            ) : (
              <div className={styles.pokemonDetails}>
                <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                <p><strong>Type:</strong> {pokemon.types.join(', ')}</p>
              </div>
            )}
            
            <button
              onClick={() => toggleDetails(index)}
              className={styles.toggleButton}
            >
              {pokemon.showDetails ? "Show image" : "Show details"}
            </button>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
            <a href="https://matias.me/nsfw/">by Aldo Barrera</a>
            </footer>
    </div>
  );
}