import { useState } from "react";

function useForm(initialState = {}) {
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // En este hook controlo directamente el cambio de estado (o valor) del objeto de mi formulario (formValues)
  const [formValues, setFormValues] = useState(initialState);

  // const handleMail = e => {
  //   setEmail(e.target.value)
  // }
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      //name: target.value
      [target.name]: target.value
    })
  }

  const reset = () => {
    setFormValues(initialState)
  }

  return [formValues, handleInputChange, reset]
}

export default useForm;