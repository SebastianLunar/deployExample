import React, { useEffect, useState } from 'react'
import {
  createAsync,
  readAsync,
  setMovies,
  updateAsync
} from '../redux/slices/movies'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from './MovieCard'
import { Box } from '@mui/material'
import { readUserInfo } from '../redux/slices/userSlice'

const Movies = () => {
  const dispatch = useDispatch()
  const [userFavorites, setUserFavorites] = useState([])
  const user = useSelector((store) => store.user)
  const { movies } = useSelector(store => store.movies)

  async function addingData () {
    // dataMovies.forEach(async (movie) => {
    //   const newMovie = {
    //     ...movie,
    //     lowerCaseTitle: movie.Title.toLowerCase()
    //   }
      
    //   await createAsync(newMovie)
    // })
  }

  async function refreshStore () {
    await readAsync().then(response => {
      dispatch(setMovies(response))
    })
  }

  async function getUserInfo (id) {
    await readUserInfo(id).then(response => {
      setUserFavorites(response.favorites)
    })
  }

  useEffect(() => {
    refreshStore()
    user.uid !== undefined ? getUserInfo(user.uid) : null
  }, [user])

  return (
    <>
      <div>Movies</div>
      <button onClick={addingData}>Agregar</button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} user={user.uid} favorites={userFavorites} refreshStore={refreshStore}/>
        ))}
      </Box>
    </>
  )
}

export default Movies
