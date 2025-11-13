import { call, put, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { api } from './api'
import {
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
  CreateSongPayload,
  Song,
} from './songs-slice'

function* fetchSongsSaga(
  action: PayloadAction<{ page?: number; limit?: number }>
) {
  try {
    const { page = 1, limit = 10 } = action.payload || {}
    const result: { songs: Song[]; pagination: PaginationInfo } = yield call(
      api.fetchSongs,
      page,
      limit
    )
    yield put(fetchSongsSuccess(result))
  } catch (error) {
    yield put(
      fetchSongsFailure(
        error instanceof Error ? error.message : 'Failed to fetch songs'
      )
    )
  }
}

function* createSongSaga(action: PayloadAction<CreateSongPayload>) {
  try {
    const song: Song = yield call(api.createSong, action.payload)
    yield put(createSongSuccess(song))
  } catch (error) {
    yield put(
      createSongFailure(
        error instanceof Error ? error.message : 'Failed to create song'
      )
    )
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    yield call(api.deleteSong, action.payload)
    yield put(deleteSongSuccess(action.payload))
  } catch (error) {
    yield put(
      deleteSongFailure(
        error instanceof Error ? error.message : 'Failed to delete song'
      )
    )
  }
}

function* updateSongSaga(action: PayloadAction<Song>) {
  try {
    const song: Song = yield call(api.updateSong, action.payload)
    yield put(updateSongSuccess(song))
  } catch (error) {
    yield put(
      updateSongFailure(
        error instanceof Error ? error.message : 'Failed to update song'
      )
    )
  }
}

export function* songsSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga)
  yield takeEvery(createSongRequest.type, createSongSaga)
  yield takeEvery(deleteSongRequest.type, deleteSongSaga)
  yield takeEvery(updateSongRequest.type, updateSongSaga)
}
