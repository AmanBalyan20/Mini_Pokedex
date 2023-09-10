import React, { useEffect, useState } from 'react';
import './App.css';
import Cards from './Components/Cards';
import Filter from './Components/Filter';
import Heading from './Components/Heading';

function App() {
  const backgroundImages = [
    '2.png',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg'
    // Add more image URLs here
  ];
  useEffect(() => {
    // Randomly select an image from the list
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];

    // Set the selected image as the background
    document.body.style.backgroundImage = `url(${selectedImage})`;
    document.body.classList.add('background-image');
  }, []); // Empty dependency array ensures this runs only once on component mount


  //Fetch the API

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className="App">
      <Heading />
      <Filter />
      <div className="app-contaner">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) =>
            <Cards
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}

        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  );
}

export default App;
