import React, { useState } from 'react'

import PropTypes from 'prop-types'

import './TodoLikeList.styles.scss'

import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import Add from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

const TodoLikeList = props => {
  const [addItemInputPrimaryValue, setAddItemInputPrimaryValue] = useState('')
  const [addItemInputSecondaryValue, setAddItemInputSecondaryValue] = useState('')

  const addItemHandler = () => props.handleAddItem(addItemInputPrimaryValue, addItemInputSecondaryValue)
  const addItemEnterPressedHandler = e => (e.key === 'Enter' ? addItemHandler() : '')

  return (
    <Paper color="text.primary" className="ListPaper">
      <List dense={true} className="List">
        {props.data.map((value, index) => (
          <ListItem key={index}>
            <ListItemText primary={value.primary} secondary={value.secondary} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => props.handleDeleteItem(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Container className="AddContainer">
        <TextField
          label="Título"
          variant="standard"
          size="small"
          className="AddInput"
          onChange={e => setAddItemInputPrimaryValue(e.target.value)}
          onKeyPress={addItemEnterPressedHandler}
        />
        <TextField
          label="Descripción"
          variant="standard"
          size="small"
          className="AddInput"
          onChange={e => setAddItemInputSecondaryValue(e.target.value)}
          onKeyPress={addItemEnterPressedHandler}
        />
        <IconButton className="AddButton" onClick={addItemHandler}>
          <Add />
        </IconButton>
      </Container>
    </Paper>
  )
}

TodoLikeList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  handleAddItem: PropTypes.func,
  handleDeleteItem: PropTypes.func
}

export default TodoLikeList
