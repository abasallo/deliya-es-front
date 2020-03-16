import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export const CarouselCard = styled(Card)`
  max-width: 450px;
  margin: auto;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
  transition: 0.3s;
  &:hover {
    transform: translateY(2px);
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.12);
  }
`

export const CarouselCardContent = styled(CardContent)`
  max-width: 450px;
  margin: auto;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
  transition: 0.3s;
  &:hover {
    transform: translateY(2px);
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.12);
  }
`
