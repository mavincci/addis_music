import type { Request, Response } from 'express'
import { SongConverter, type CreateSongDto } from '../dtos/song.dto'
import { SongModel } from '../models/song-model'

async function getAllSongs(req: Request, resp: Response) {
  console.log('Fetch all songs called')

  const allSongs = await SongModel.find()

  resp.status(200).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'FETCH_ALL_SONGS_SUCCESS',
    data: SongConverter.toDtoArray(allSongs),
  })
}

async function getSong(req: Request, resp: Response) {
  try {
    const songId = req.params.song_id
    const tempSong = await SongModel.findById(songId)

    if (!tempSong) {
      return resp.status(404).json({
        timestamp: new Date().toISOString(),
        isError: true,
        message: 'SONG_NOT_FOUND',
        data: undefined,
      })
    }

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'FETCH_SONG_SUCCESS',
      data: SongConverter.toDto(tempSong),
    })
  } catch (error) {
    resp.status(400).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'INVALID_ID_FORMAT',
      data: undefined,
    })
  }
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

async function deleteSong(req: Request, resp: Response) {
  try {
    const songId = req.params.song_id
    const deletedSong = await SongModel.findByIdAndDelete(songId)

    if (!deletedSong) {
      return resp.status(404).json({
        timestamp: new Date().toISOString(),
        isError: true,
        message: 'SONG_NOT_FOUND',
        data: undefined,
      })
    }

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'DELETE_SONG_SUCCESS',
      data: undefined,
    })
  } catch (error) {
    resp.status(400).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'INVALID_ID_FORMAT',
      data: undefined,
    })
  }
}

export { getAllSongs, getSong, addSong, deleteSong }
