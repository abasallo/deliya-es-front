import styled from 'styled-components'

import MaterialUIButton from '@material-ui/core/Button'

import { customMUITheme as theme } from '../../customMUITheme'

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15% 0 5%;
`

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Button = styled(MaterialUIButton)`
  margin: ${theme.spacing(1, 0, 1)};
`
