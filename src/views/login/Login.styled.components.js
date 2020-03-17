import styled from 'styled-components'

import MaterialUIButton from '@material-ui/core/Button'
import MaterialUIFormControlLabel from '@material-ui/core/FormControlLabel'

import { customMUITheme as theme } from '../../customMUITheme'

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15% 0 5%;
`

export const FormControlLabel = styled(MaterialUIFormControlLabel)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Button = styled(MaterialUIButton)`
  margin: ${theme.spacing(1, 0, 1)};
`
