import React from 'react'

import { IconButton } from '@material-ui/core'

import { CloseTwoToneIconStyled, DoneTwoToneIconStyled } from './YesNoButtonGroup.styled.components'

const YesNoButtonGroup = () => (
  <React.Fragment>
    <IconButton tooltip="No">
      <CloseTwoToneIconStyled />
    </IconButton>
    <IconButton tooltip="Sí">
      <DoneTwoToneIconStyled />
    </IconButton>
  </React.Fragment>
)

export default YesNoButtonGroup
