import { createMuiTheme } from '@material-ui/core/styles'

export const customMUITheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: '#ffffff',
        margin: '3px',
        '&:hover': {
          backgroundColor: '#fce6f8'
        }
      }
    }
  }
})
