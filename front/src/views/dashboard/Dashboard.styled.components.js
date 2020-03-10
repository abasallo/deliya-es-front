import styled from 'styled-components'

import MaterialUIAppBar from '@material-ui/core/AppBar'
import MaterialUIContainer from '@material-ui/core/Container'

import { customMUITheme as theme } from '../../customMUITheme'

export const AppBar = styled(MaterialUIAppBar)`
  flex-grow: 1;
  background-color: #ffffff;
  z-index: ${theme.zIndex.drawer + 1};
`

export const Logo = styled.img`
  flex-grow: 1;
  margin: 5px;
  max-width: 75px;
  width: 100%;
  height: auto;
`

export const HeaderLoginButtons = styled.div`
  flex-grow: 1;
  text-align: right;
`

export const Container = styled(MaterialUIContainer)`
  margin-top: 50px;
  text-align: center;
`
