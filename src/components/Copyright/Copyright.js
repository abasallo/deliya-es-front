import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import constants from '../../modules/constants'

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {constants.COPYRIGHT_TEXT}
    <Link color="inherit" href={constants.COPYRIGHT_LINK}>
      {constants.COPYRIGHT_LINK_TEXT}
    </Link>
    {' ' + new Date().getFullYear()}
  </Typography>
)

export default Copyright
