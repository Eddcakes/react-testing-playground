import React, { useState, useEffect } from "react";

export default function PokemonList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(chunk => {
        // console.log(chunk);
        setList(chunk.results.map(pkmn => pkmn.name));
      })
      .catch(setList([]));
  }, []);
  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {list.length > 0 ? (
          list.map((pokemon, index) => <li key={index + pokemon}>{pokemon}</li>)
        ) : (
          <li>pokemon loading</li>
        )}
      </ul>
    </div>
  );
}
