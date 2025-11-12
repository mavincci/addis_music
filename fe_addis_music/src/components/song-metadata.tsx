import styled from '@emotion/styled'

const SongMetadataStyled = styled.section`
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const SongMetadataItem = styled.span`
  text-align: center;
  padding: 16px;

  p:first-of-type {
    font-size: 32px;
    font-weight: 600;
    margin: 0;
  }

  p:nth-of-type(2) {
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    margin: 0;
    margin-top: 8px;
  }
`

export const SongMetadata = () => {
  return (
    <SongMetadataStyled>
      <SongMetadataItem>
        <p>100</p>
        <p> Songs</p>
      </SongMetadataItem>
      <SongMetadataItem>
        <p>100</p>
        <p>Artist</p>
      </SongMetadataItem>
      <SongMetadataItem>
        <p>100</p>
        <p> Albums</p>
      </SongMetadataItem>
    </SongMetadataStyled>
  )
}
