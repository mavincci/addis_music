import styled from '@emotion/styled'

const AppBarStyled = styled.section`
  border: 4px solid;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Arial Black', sans-serif;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`

export const AppBar = () => {
  return <AppBarStyled>Addis Songs</AppBarStyled>
}
