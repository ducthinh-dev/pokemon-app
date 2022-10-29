import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import axios from 'axios'
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPage, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(
      res => {
        setNextPage(res.data.next)
        setPrevPage(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
        setLoading(false);
      })
    return () => cancel()

  }, [currentPage])

  if (loading) return "LOADING..."

  function goToNextPage() {
    setCurrentPage(nextPage)
  }

  function goToPrevPage() {
    setCurrentPage(prevPage)
  }

  return (
    <>
      <PokeList pokemons={pokemon} />
      <Pagination 
        goToNextPage={nextPage ? goToNextPage : null}
        goToPrevPage={prevPage ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
