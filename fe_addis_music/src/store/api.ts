import { Song, CreateSongPayload, PaginationInfo } from './songs-slice'

const API_BASE_URL = 'http://localhost:3000/api'

export const api = {
  fetchSongs: async (
    page = 1,
    limit = 10
  ): Promise<{ songs: Song[]; pagination: PaginationInfo }> => {
    const response = await fetch(
      `${API_BASE_URL}/songs?page=${page}&limit=${limit}`
    )
    const data = await response.json()
    return { songs: data.data, pagination: data.pagination }
  },

  createSong: async (song: CreateSongPayload): Promise<Song> => {
    const response = await fetch(`${API_BASE_URL}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    })
    const data = await response.json()
    return data.data
  },

  deleteSong: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'DELETE',
    })
  },
}
