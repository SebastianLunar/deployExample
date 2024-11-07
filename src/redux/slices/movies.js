import { createSlice } from "@reduxjs/toolkit"
import { auth, firestore } from "../../firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";


const initialState = {
  movies: []
}

export const moviesReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload
    },
  },
})

export const { setMovies } = moviesReducer.actions
export default moviesReducer.reducer

// ----------------------------------------------------------------

// Actions (funciones)

// Create
export const createAsync = async (data) => {
  try {
    const response = await addDoc(collection(firestore, "peliculas"), data)
    if (response) {
      console.log(response)
      console.log("Document written with ID: ", response.id);
    }
  } catch (error) {
    console.error(error);
  }
}

// Read
export const readAsync = async () => {
  const datos = [];
  try {
    const peliculas = await getDocs(collection(firestore, "peliculas"));
    peliculas.forEach((item) => {
      datos.push(
        {
          ...item.data(),
        }
      )
    })
    return datos;
  } catch (error) {
    console.error(error);
  }
}

// Update
export const updateAsync = async (newData) => {
  console.log(newData)
  const moviesCollection = collection(firestore, "peliculas")
  const movieQuery = query(moviesCollection, where("id", "==", newData.id))

  const queriedData = await getDocs(movieQuery)
  let id

  queriedData.forEach((item) => {
    id = item.id
  })

  const docRef = doc(firestore, "peliculas", id)
  console.log(docRef)

  const response = await updateDoc(docRef, newData)
}

// Delete
export const deleteAsync = async (id) => {
  try {
    const moviesCollection = collection(firestore, "peliculas")
    const movieQuery = query(moviesCollection, where("id", "==", id))

    const datos = await getDocs(movieQuery);

    datos.forEach((item) => {
      item.isDeletable ? deleteDoc(doc(firestore, "peliculas", item.id)): alert("No puede eliminar este item")
    })
  } catch (error) {
    console.error(error);
  }
}


