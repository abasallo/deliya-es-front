import React from 'react'

import { IconButton } from '@material-ui/core'

import { CloseTwoToneIconStyled, DoneTwoToneIconStyled } from './YesNoButtonGroup.styled.components'

import constants from '../../modules/constants'

const YesNoButtonGroup = () => (
  <React.Fragment>
    <IconButton tooltip={constants.NO_TEXT}>
      <CloseTwoToneIconStyled />
    </IconButton>
    <IconButton tooltip={constants.YES_TEXT}>
      <DoneTwoToneIconStyled />
    </IconButton>
  </React.Fragment>
)

export default YesNoButtonGroup
