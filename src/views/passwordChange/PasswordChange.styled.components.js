import styled from 'styled-components'

import MaterialUIButton from '@material-ui/core/Button'
import MaterialUIModal from '@material-ui/core/Modal'

import { customMUITheme as theme } from '../../customMUITheme'

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15% 0 5%;
`

export const Button = styled(MaterialUIButton)`
  margin: ${theme.spacing(1, 0, 1)};
`

export const Modal = styled(MaterialUIModal)`
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
  width: 400px;
  background-color: white;
  border: 2px solid #000;
  box-shadow: 5px 5px 10px;
`
