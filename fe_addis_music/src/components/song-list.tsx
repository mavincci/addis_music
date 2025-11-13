import { useState } from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { MdClose, MdEdit } from 'react-icons/md'
import { Pagination } from './pagination'
import { SongsDialog } from './songs-dialog'

interface Song {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  createdAt: Date
  updatedAt: Date
}

interface SongItemProps {
  song: Song
  onDelete: (id: string) => void
  onEdit: (song: Song) => void
}

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

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

const SongItem = ({ song, onDelete, onEdit }: SongItemProps) => {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean
    title: string
    songs: Song[]
  }>({ isOpen: false, title: '', songs: [] })

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

  const handleFieldClick = async (
    type: 'artist' | 'album' | 'genre',
    value: string
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/songs/by-${type}/${encodeURIComponent(value)}`
      )
      const data = await response.json()
      setDialogState({
        isOpen: true,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`,
        songs: data.data,
      })
    } catch (error) {
      console.error(`Failed to fetch songs by ${type}:`, error)
    }
  }

  const handleCloseDialog = () => {
    setDialogState({ isOpen: false, title: '', songs: [] })
  }

  return (
    <>
      <SongItemStyled>
        <div>
          <p
            className={css`
              font-weight: 900;
              font-size: 18px;
              margin: 0;
            `}
          >
            {song.title}
          </p>
          <p
            onClick={() => handleFieldClick('artist', song.artist)}
            className={css`
              margin: 0;
              font-style: italic;
              color: #666;
              cursor: pointer;

              &:hover {
                color: #007bff;
                text-decoration: underline;
              }
            `}
          >
            {song.artist}
          </p>
          <p
            onClick={() => handleFieldClick('album', song.album)}
            className={css`
              margin: 0;
              margin-top: 8px;
              cursor: pointer;

              &:hover {
                color: #007bff;
                text-decoration: underline;
              }
            `}
          >
            {song.album}
          </p>
          <p
            onClick={() => handleFieldClick('genre', song.genre)}
            className={css`
              margin: 0;
              margin-top: 4px;
              font-size: 14px;
              color: #888;
              cursor: pointer;

              &:hover {
                color: #007bff;
                text-decoration: underline;
              }
            `}
          >
            Genre: {song.genre}
          </p>
        </div>

        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 8px;
          `}
        >
          <button
            onClick={() => onDelete(song._id)}
            className={css`
              border: none;
              background-color: white;
              color: red;
              cursor: pointer;
              padding: 8px;
              border-radius: 4px;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;

              &:hover {
                background-color: #fee;
              }
            `}
          >
            <MdClose size={20} />
          </button>
          <button
            onClick={() => onEdit(song)}
            className={css`
              border: 1px solid #ccc;
              background-color: white;
              color: #333;
              cursor: pointer;
              padding: 8px;
              border-radius: 4px;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;

              &:hover {
                background-color: #f5f5f5;
              }
            `}
          >
            <MdEdit size={16} />
          </button>
        </div>
      </SongItemStyled>
      <SongsDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        songs={dialogState.songs}
        onClose={handleCloseDialog}
      />
    </>
  )
}

interface SongsListProps {
  songs?: Song[]
  onDeleteSong?: (id: string) => void
  onEditSong?: (song: Song) => void
  pagination?: {
    page: number
    totalPages: number
    limit: number
  }
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export const SongsList = ({
  songs = [],
  onDeleteSong = () => {},
  onEditSong = () => {},
  pagination,
  onPageChange = () => {},
  onLimitChange = () => {},
}: SongsListProps) => {
  if (songs.length === 0) {
    return (
      <SongsListStyled>
        <p
          className={css`
            text-align: center;
            color: #666;
            font-style: italic;
          `}
        >
          No songs available. Add some songs to get started!
        </p>
      </SongsListStyled>
    )
  }

  return (
    <SongsListStyled>
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          limit={pagination.limit}
          onLimitChange={onLimitChange}
        />
      )}
      {songs.map((song) => (
        <SongItem
          key={song._id}
          song={song}
          onDelete={onDeleteSong}
          onEdit={onEditSong}
        />
      ))}
    </SongsListStyled>
  )
}
