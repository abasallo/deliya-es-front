import React from 'react'

import SnackbarMaterialUI from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import PropTypes from 'prop-types'
import constants from '../../modules/constants'

const Snackbar = (props) => (
  <SnackbarMaterialUI open={props.state.snackbar.open} autoHideDuration={constants.SNACKBAR_AUTO_HIDE_TIME} onClose={props.onClose}>
    <Alert onClose={props.onClose} severity="success">
      {props.state.snackbar.text}
    </Alert>
  </SnackbarMaterialUI>
)

Snackbar.propTypes = { state: PropTypes.object, onClose: PropTypes.func }

export default Snackbar
