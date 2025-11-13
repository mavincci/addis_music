import { useState } from 'react'
import styled from '@emotion/styled'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { MetadataDialog } from './metadata-dialog'

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
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

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
  const { metadata } = useAppSelector((state) => state.songs)
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean
    title: string
    items: { name: string; count: number }[]
  }>({ isOpen: false, title: '', items: [] })

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

  const handleArtistsClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/stats/artists`)
      const data = await response.json()
      setDialogState({
        isOpen: true,
        title: 'Artists',
        items: data.data,
      })
    } catch (error) {
      console.error('Failed to fetch artist stats:', error)
    }
  }

  const handleAlbumsClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/stats/albums`)
      const data = await response.json()
      setDialogState({
        isOpen: true,
        title: 'Albums',
        items: data.data,
      })
    } catch (error) {
      console.error('Failed to fetch album stats:', error)
    }
  }

  const handleCloseDialog = () => {
    setDialogState({ isOpen: false, title: '', items: [] })
  }

  return (
    <>
      <SongMetadataStyled>
        <SongMetadataItem>
          <p>{metadata?.totalSongs || 0}</p>
          <p>Songs</p>
        </SongMetadataItem>
        <SongMetadataItem onClick={handleArtistsClick}>
          <p>{metadata?.uniqueArtists || 0}</p>
          <p>Artists</p>
        </SongMetadataItem>
        <SongMetadataItem onClick={handleAlbumsClick}>
          <p>{metadata?.uniqueAlbums || 0}</p>
          <p>Albums</p>
        </SongMetadataItem>
      </SongMetadataStyled>
      <MetadataDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        items={dialogState.items}
        onClose={handleCloseDialog}
      />
    </>
  )
}
