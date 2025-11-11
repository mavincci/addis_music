import type { Request, Response } from 'express'

function getAllSongs(req: Request, resp: Response) {
  console.log('Fetch all songs called')
  resp.status(200).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'FETCH_ALL_SONGS_SUCCESS',
    data: [],
  })
}

function getSong(req: Request, resp: Response) {
  console.log('Fetch a song called')

  const songId = req.params.song_id

  console.log(`FETCH_SONG: with id {${songId}}`)
  resp.status(200).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'FETCH_SONG_SUCCESS',
    data: {},
  })
}

function addSong(req: Request, resp: Response) {
  console.log('Add song called')

  resp.status(201).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'ADD_SONG_SUCCESS',
    data: {},
  })
}

function deleteSong(req: Request, resp: Response) {
  console.log('Add song called')

  const songId = req.params.song_id

  console.log(`DELETE_SONG: with id {${songId}}`)

  resp.status(201).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'DELETE_SONG_SUCCESS',
    data: undefined,
  })
}

export { getAllSongs, getSong, addSong, deleteSong }
