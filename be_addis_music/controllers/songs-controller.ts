import type { Request, Response } from 'express'
import { SongConverter, type CreateSongDto } from '../dtos/song.dto'
import { SongModel } from '../models/song-model'

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

async function addSong(req: Request, resp: Response) {
  console.log('Add song called')

  const tempSong: CreateSongDto = req.body

  console.log(`Add Song: `, tempSong)

  const existingSong = await SongModel.findOne({ title: tempSong.title.trim() })

  if (existingSong) {
    return resp.status(409).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'SONG_ALREADY_EXISTS',
      data: undefined,
    })
  }

  const tempSongDoc = new SongModel({
    title: tempSong.title.trim(),
    artist: tempSong.artist.trim(),
    album: tempSong.album.trim(),
    genre: tempSong.genre.trim(),
  })

  const savedSong = await tempSongDoc.save()

  resp.status(201).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'ADD_SONG_SUCCESS',
    data: SongConverter.toDto(savedSong),
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
