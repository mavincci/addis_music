import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Song {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateSongPayload {
  title: string
  artist: string
  album: string
  genre: string
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface MetadataInfo {
  totalSongs: number
  uniqueArtists: number
  uniqueAlbums: number
}

interface SongsState {
  songs: Song[]
  loading: boolean
  error: string | null
  pagination: PaginationInfo | null
  metadata: MetadataInfo | null
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
  pagination: null,
  metadata: null,
}

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest: (
      state,
      action: PayloadAction<{ page?: number; limit?: number }>
    ) => {
      state.loading = true
      state.error = null
    },
    fetchSongsSuccess: (
      state,
      action: PayloadAction<{ songs: Song[]; pagination: PaginationInfo }>
    ) => {
      state.loading = false
      state.songs = action.payload.songs
      state.pagination = action.payload.pagination
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    createSongRequest: (state, action: PayloadAction<CreateSongPayload>) => {
      state.loading = true
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false
      state.songs.push(action.payload)
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    deleteSongRequest: (state, action: PayloadAction<string>) => {
      state.loading = true
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.songs = state.songs.filter((song) => song._id !== action.payload)
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateSongRequest: (state, action: PayloadAction<Song>) => {
      state.loading = true
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      )
      if (index !== -1) {
        state.songs[index] = action.payload
      }
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    fetchMetadataRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchMetadataSuccess: (state, action: PayloadAction<MetadataInfo>) => {
      state.loading = false
      state.metadata = action.payload
    },
    fetchMetadataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  fetchMetadataRequest,
  fetchMetadataSuccess,
  fetchMetadataFailure,
} = songsSlice.actions
export default songsSlice.reducer
