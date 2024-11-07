import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  facebookLogin,
  googleLogin,
  logout,
  setUser
} from './redux/slices/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/Login'
import Movies from './components/Movies'

function App () {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleAuth = async type => {
    switch (type) {
      case 'google':
        await googleLogin().then(user => {
          dispatch(setUser(user))
        })
        break
      case 'facebook':
        await facebookLogin().then(user => {
          dispatch(setUser(user))
        })
        break

      case 'logout':
        await logout().then(() => {
          dispatch(
            setUser({
              displayName: '',
              email: '',
              photoURL: '',
              isAuthenticated: false
            })
          )
        })
        break

      default:
        break
    }
  }

  useEffect(() => {
    const validateUserState = onAuthStateChanged(auth, user => {
      console.log(user)
      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            isAuthenticated: true
          })
        )
      }
    })

    return () => validateUserState()
  }, [dispatch, user])

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>

      {user.isAuthenticated && (
        <>
          <h1>Bienvenido, {user.displayName}</h1>
          <h2>Con correOo: {user.email}</h2>
          <img
            src={user.photoURL}
            alt='User profile image'
            referrerPolicy='no-referrer'
            width='10%'
          />
        </>
      )}

      <button onClick={() => handleAuth('google')}>Login Google</button>
      <button onClick={() => handleAuth('facebook')}>Login Facebook</button>
      <button onClick={() => handleAuth('logout')}>Logout</button>

      <hr />
      <div>
        <div>
          <h1>Registrate</h1>
          <RegisterForm />
        </div>

        <div>
          <h1>Iniciar sesión</h1>
          <LoginForm />
        </div>
      </div>

      <hr />
      <h1>Las Películas</h1>
      <Movies />
    </>
  )
}

export default App
