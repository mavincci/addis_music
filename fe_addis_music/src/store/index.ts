import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import songsReducer from './songs-slice'
import { songsSaga } from './songs-saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(songsSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
