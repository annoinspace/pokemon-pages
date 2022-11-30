import React, { useState, useEffect } from "react"
import PokemonList from "./components/PokemonList"
import axios from "axios"
import Pagination from "./components/Pagination"

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  )
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  )
  const [previousPageUrl, setPreviousPageUrl] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setLoading(false)
        console.log(res)
        setNextPageUrl(res.data.next)
        setPreviousPageUrl(res.data.previous)
        setPokemon(res.data.results.map((p) => p.name))
      })

    return () => cancel()
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function goToPreviousPage() {
    setPreviousPageUrl(previousPageUrl)
    console.log(previousPageUrl)
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      />
    </>
  )
}

export default App
