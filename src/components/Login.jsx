import React from 'react'
import useForm from '../../hooks/useForm'
import { mailLogin, setUser } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await mailLogin(formValues.email, formValues.password).then((response) => {
      dispatch(setUser(response))
    })

    reset()
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formValues.email}
            onChange={handleInputChange}
            placeholder='Ingrese correo'
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={formValues.password}
            onChange={handleInputChange}
            placeholder='Ingrese su contraseña'
          />
        </div>
        <button type='submit'>Ingresar</button>
      </form>
    </section>
  )
}

export default LoginForm
