import styled from 'styled-components'

import MaterialUIAppBar from '@material-ui/core/AppBar'
import MaterialUIContainer from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import { customMUITheme as theme } from '../../customMUITheme'

export const AppBar = styled(MaterialUIAppBar)`
  flex-grow: 1;
  background-color: #ffffff;
  z-index: ${theme.zIndex.drawer + 1};
  margin-bottom: 50px;
`

export const Logo = styled.img`
  flex-grow: 1;
  max-width: 40px;
  width: 100%;
  height: auto;
`

export const HeaderLoginButtons = styled.div`
  flex-grow: 1;
  text-align: right;
`

export const Container = styled(MaterialUIContainer)`
  margin-top: 25px;
  text-align: center;
`

export const CopyrightBox = styled(Box)`
  margin-top: 25px;
  text-align: center;
`
