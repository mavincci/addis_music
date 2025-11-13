import { useEffect, useState } from 'react'
import { AppBar } from '../components/app-bar'
import { SongsList } from '../components/song-list'
import { SongMetadata } from '../components/song-metadata'
import { EditSongDialog } from '../components/edit-song-dialog'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchSongsRequest,
  deleteSongRequest,
  updateSongRequest,
  Song,
} from '../store/songs-slice'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const { songs, loading, pagination } = useAppSelector((state) => state.songs)
  const [editingSong, setEditingSong] = useState<Song | null>(null)

  useEffect(() => {
    dispatch(fetchSongsRequest({ page: 1, limit: 5 }))
  }, [])

  const handleDeleteSong = (id: string) => {
    dispatch(deleteSongRequest(id))
  }

  const handleEditSong = (song: Song) => {
    setEditingSong(song)
  }

  const handleSaveEdit = (song: Song) => {
    dispatch(updateSongRequest(song))
    setEditingSong(null)
  }

  const handleCloseEdit = () => {
    setEditingSong(null)
  }

  const handlePageChange = (page: number) => {
    dispatch(fetchSongsRequest({ page, limit: pagination?.limit || 5 }))
  }

  const handleLimitChange = (limit: number) => {
    dispatch(fetchSongsRequest({ page: 1, limit }))
  }

  if (loading) {
    return (
      <>
        <AppBar />
        <SongMetadata />
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
      </>
    )
  }

  return (
    <>
      <AppBar />
      <SongMetadata />
      <SongsList
        songs={songs}
        onDeleteSong={handleDeleteSong}
        onEditSong={handleEditSong}
        pagination={
          pagination
            ? {
                page: pagination.page,
                totalPages: pagination.totalPages,
                limit: pagination.limit,
              }
            : undefined
        }
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
      <EditSongDialog
        song={editingSong}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
    </>
  )
}
