import { createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, facebookProvider, firestore, googleProvider } from "../../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

const initialState = {
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
  isAuthenticated: false,
  userDB: []
}

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL || "";
      state.isAuthenticated = action.payload.isAuthenticated;
      state.uid = action.payload.uid;
    },
  },
})

export const { setUser } = userReducer.actions
export default userReducer.reducer

// ----------------------------------------------------------------

// Actions (funciones)

export const readUserInfo = async (id) => {
  try {
    const userInfo = await getDoc(doc(firestore, "usersInfo", id));
 
    return userInfo.data();
  } catch (error) {
    console.error(error);
  }
}


// Update
export const updateFavoritesAsync = async (id, newData) => {
  console.log(newData)
  const docRef = doc(firestore, "usersInfo", id)
  await updateDoc(docRef, newData)
}


export const createUserDb = async (id, data) => {
  try {
    const response = await setDoc(doc(firestore, "usersInfo", id), data);
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

export const mailRegister = async ({ name, email, photoURL, password }) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    if (response) {
      await updateProfile(response.user, {
        displayName: name,
        photoURL: photoURL || "",
      })
      const userData = {
        displayName: name,
        email: response.user.email,
        photoURL: photoURL || "",
        age: '',
        height: 0,
        weight: 0,
        favorites: []
      }
      await createUserDb(response.user.uid, userData)
      return {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        uid: response.user.uid,
        isAuthenticated: true,
      }
    }
  } catch (error) {
    console.error("Hubo un error: " + error)
  }
}

export const mailLogin = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (response) {
      console.log(response)
      return {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        isAuthenticated: true,
      }
    }
  } catch (error) {
    console.error("Hubo un error: " + error)
  }
}

export const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider)
    if (response) {
      const userData = {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        age: '',
        height: 0,
        weight: 0,
        favorites: []
      }
      await createUserDb(response.user.uid, userData)
      return {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        isAuthenticated: true,
      }
    }
  } catch (error) {
    console.error("Hubo un error: " + error)
  }
}

export const facebookLogin = async () => {
  try {
    const response = await signInWithPopup(auth, facebookProvider)
    if (response) {
      const userData = {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        age: '',
        height: 0,
        weight: 0,
        favorites: []
      }
      await createUserDb(response.user.uid, userData)
      return {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        isAuthenticated: true,
      }
    }
  } catch (error) {
    console.error("Hubo un error: " + error)
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Hubo un error al hacer logout: " + error)
  }
}

// Update userDataBase Favorites
export const updateFavorites = async (newData) => {
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

