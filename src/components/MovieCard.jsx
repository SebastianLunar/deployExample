import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, Button, Modal, TextField } from '@mui/material'
import { deleteAsync, updateAsync } from '../redux/slices/movies'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { updateFavoritesAsync } from '../redux/slices/userSlice'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: '#000'
}

const MovieCard = ({ movie, user, favorites, refreshStore }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = async () => {
    console.log('Voy a eliminar')
    await deleteAsync(movie.id)
  }

  const handleFavorite = async () => {
    const newFavorites = {
      favorites: [
        ...favorites,
        movie
      ]
    }
    await updateFavoritesAsync(user, newFavorites)
  }

  const moviesFormSchema = Yup.object().shape({
    Carrusel: Yup.string().required(),
    Description: Yup.string()
      .required()
      .min(50, 'La descripción no es lo suficientemente larga'),
    Poster: Yup.string().required(),
    Title: Yup.string()
      .required()
      .min(3, 'Título demasiado pequeño')
      .max(50, 'Título demasiado largo'),
    Trailer: Yup.string().required(),
    Type: Yup.string().required(),
    Value: Yup.number().required(),
    Year: Yup.string().required().length(4)
  })

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              {movie.Value}
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={movie.Title}
          subheader={movie.Year}
        />
        <CardMedia
          component='img'
          height='194'
          image={movie.Poster}
          alt='Paella dish'
        />
        <CardContent>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {movie.Description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites' onClick={handleFavorite}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='edit' onClick={handleOpen}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label='delete' onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h5' component='h2'>
                Editting {movie.Title}
              </Typography>
              <Formik
                initialValues={{
                  Carrusel: movie.Carrusel,
                  Description: movie.Description,
                  Poster: movie.Poster,
                  Title: movie.Title,
                  Trailer: movie.Trailer,
                  Type: movie.Type,
                  Value: movie.Value,
                  Year: movie.Year
                }}
                validationSchema={moviesFormSchema}
                onSubmit={async values => {
                  const newData = {
                    ...values,
                    id: movie.id
                  }

                  await updateAsync(newData).then(() => {
                    refreshStore()
                  })
                }}
              >
                <Form style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>Carrusel: </label>
                  <Field
                    type='text'
                    placeholder='Ingrese URL del banner'
                    name='Carrusel'
                  />
                  <ErrorMessage
                    name='Carrusel'
                    component='div'
                    className='error'
                  />

                  <hr />

                  <label>Description: </label>
                  <Field
                    as='textarea'
                    type='text'
                    placeholder='Ingrese descripción'
                    name='Description'
                  />
                  <ErrorMessage
                    name='Description'
                    component='div'
                    className='error'
                  />

                  <hr />
                  <label>Poster: </label>
                  <Field
                    type='text'
                    placeholder='Ingrese poster de la película'
                    name='Poster'
                  />
                  <ErrorMessage
                    name='Poster'
                    component='div'
                    className='error'
                  />

                  <hr />
                  <label>Title: </label>
                  <Field
                    type='text'
                    placeholder='Ingrese título de la película'
                    name='Title'
                  />
                  <ErrorMessage
                    name='Title'
                    component='div'
                    className='error'
                  />

                  <hr />
                  <label>Trailer: </label>
                  <Field
                    type='text'
                    placeholder='Ingrese URL del trailer'
                    name='Trailer'
                  />
                  <ErrorMessage
                    name='Trailer'
                    component='div'
                    className='error'
                  />

                  <hr />
                  <label>Type: </label>
                  <Field as='select' name='Type'>
                    <option value='Adulto'>Adulto</option>
                    <option value='Infantil'>Infantil</option>
                  </Field>

                  <ErrorMessage name='Type' component='div' className='error' />

                  <hr />
                  <label>Value: </label>
                  <Field
                    type='number'
                    placeholder='Ingrese Calificación'
                    name='Value'
                  />
                  <ErrorMessage
                    name='Value'
                    component='div'
                    className='error'
                  />

                  <hr />
                  <label>Year: </label>
                  <Field
                    type='text'
                    placeholder='Ingrese Año de Estreno'
                    name='Year'
                  />
                  <ErrorMessage name='Year' component='div' className='error' />

                  <hr />
                  <Button variant='contained' color='success' type='submit'>
                    Guardar
                  </Button>
                </Form>
              </Formik>

              {/* <form onSubmit={handleSubmit}>
                <div>
                  <label>Nombre Pelicula:</label>
                  <TextField
                    type='text'
                    name='Title'
                    value={formValues.Title}
                    onChange={handleInputChange}
                    placeholder='Nombre de la película'
                  />
                </div>
                <div>
                  <label>Tipo:</label>
                  <TextField
                    type='text'
                    name='Type'
                    value={formValues.Type}
                    onChange={handleInputChange}
                    placeholder='Ingrese tipo'
                  />
                </div>
                <div>
                  <label>Photo url:</label>
                  <TextField
                    type='text'
                    name='Poster'
                    value={formValues.Poster}
                    onChange={handleInputChange}
                    placeholder='Ingrese una url de imagen'
                  />
                </div>
                <div>
                  <label>Calificación:</label>
                  <TextField
                    type='number'
                    name='Value'
                    value={formValues.Value}
                    onChange={handleInputChange}
                    placeholder='Ingrese su contraseña'
                  />
                </div>
                <button type='submit'>Registrar</button>
              </form> */}
            </Box>
          </Modal>
        </CardActions>
      </Card>
    </>
  )
}

export default MovieCard
