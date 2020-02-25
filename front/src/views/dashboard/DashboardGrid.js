import React, { useState } from 'react'

import PropTypes from 'prop-types'

import './DashboardGrid.styles.scss'

import { cloneAndDeleteFromAt } from '../../modules/Utils'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

import TodoLikeList from '../../components/TodoLikeList'

const DashboardGrid = props => {
  const [todoList, setTodoList] = useState(props.eventState.todoList)
  const handleTodoListAddItem = (primary, secondary) => setTodoList([{ primary: primary, secondary: secondary }].concat(todoList))
  const handleTodoListDeleteItem = index => setTodoList(cloneAndDeleteFromAt(todoList, index))

  const [productList, setProductList] = useState(props.eventState.productList)
  const handleProductListAddItem = (primary, secondary) => setProductList([{ primary: primary, secondary: secondary }].concat(productList))
  const handleProductListDeleteItem = index => setProductList(cloneAndDeleteFromAt(productList, index))

  return (
    <div className="MainContainer">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className="ContainerPaper">
            <img src={props.eventState.picture} alt="Event" id="EventPicture" />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className="ContainerPaperNonCentered">
            <TextField multiline rowsMax="2" fullWidth label="Evento" defaultValue={props.eventState.name} className="TextAreas" />
            <TextField
              multiline
              rowsMax="4"
              fullWidth
              label="Descripción"
              defaultValue={props.eventState.description}
              className="TextAreas"
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="ContainerPaper">
            <iframe title={props.eventState.map.title} id="Map" src={props.eventState.map.src}>
              .
            </iframe>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <TodoLikeList data={todoList} handleAddItem={handleTodoListAddItem} handleDeleteItem={handleTodoListDeleteItem} />
        </Grid>
        <Grid item xs={2}>
          <Container className="Buttons">
            <Button variant="contained" color="primary" className="Buttons">
              Personalizar
            </Button>
            <Button variant="contained" color="secondary" className="Buttons">
              Comprar
            </Button>
          </Container>
        </Grid>
        <Grid item xs={5}>
          <TodoLikeList data={productList} handleAddItem={handleProductListAddItem} handleDeleteItem={handleProductListDeleteItem} />
        </Grid>
      </Grid>
    </div>
  )
}

DashboardGrid.propTypes = {
  eventState: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    map: PropTypes.shape({
      title: PropTypes.string,
      src: PropTypes.string
    }),
    todoList: PropTypes.arrayOf(PropTypes.object),
    productList: PropTypes.arrayOf(PropTypes.object)
  })
}

export default DashboardGrid
