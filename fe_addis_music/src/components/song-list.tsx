import { css } from '@emotion/css'
import styled from '@emotion/styled'

const SongsListStyled = styled.section`
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
`

const SongItemStyled = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
`

const SongItem = () => (
  <SongItemStyled>
    <span>
      <p
        className={css`
          font-weight: 900;
          font-size: 18px;
          margin: 0;
        `}
      >
        Rolling in the Deep
      </p>
      <p
        className={css`
          margin: 0;
          font-style: italic;
        `}
      >
        The Weeknd
      </p>

      <p
        className={css`
          margin: 0;
          margin-top: 8px;
        `}
      >
        After Hours
      </p>
    </span>

    <span
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      `}
    >
      <button
        className={css`
          border: none;
          background-color: white;
          color: red;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          padding: 4px;
          aspect-ratio: 1 / 1;

            &:hover {
            background-color: #eee;
        }

        `}
      >
        X
      </button>
      <button className={css``}>Edit</button>
    </span>
  </SongItemStyled>
)

export const SongsList = () => {
  return (
    <SongsListStyled>
      <SongItem />
    </SongsListStyled>
  )
}
