import { useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { MdClose } from 'react-icons/md'

interface Song {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  createdAt: Date
  updatedAt: Date
}

interface SongsDialogProps {
  isOpen: boolean
  title: string
  songs: Song[]
  onClose: () => void
}

const StyledDialog = styled.dialog`
  border: none;
  border-radius: 8px;
  padding: 16px;
  width: 600px;
  max-width: 90vw;
  max-height: 80vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const SongsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const SongItem = styled.div`
  padding: 12px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`

const SongTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`

const SongDetails = styled.div`
  font-size: 14px;
  color: #666;
`

export const SongsDialog = ({
  isOpen,
  title,
  songs,
  onClose,
}: SongsDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal()
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <StyledDialog ref={dialogRef} onClose={onClose}>
      <Header>
        <h3
          className={css`
            margin: 0;
          `}
        >
          {title}
        </h3>
        <button
          type='button'
          onClick={onClose}
          className={css`
            border: none;
            background: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              background-color: #f5f5f5;
            }
          `}
        >
          <MdClose size={20} />
        </button>
      </Header>

      <SongsList>
        {songs.map((song) => (
          <SongItem key={song._id}>
            <SongTitle>{song.title}</SongTitle>
            <SongDetails>
              {song.artist} • {song.album} • {song.genre}
            </SongDetails>
          </SongItem>
        ))}
      </SongsList>
    </StyledDialog>
  )
}
