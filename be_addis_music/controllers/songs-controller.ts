import type { Request, Response } from 'express'
import {
  SongConverter,
  type CreateSongDto,
  type UpdateSongDto,
} from '../dtos/song.dto'
import { SongModel } from '../models/song-model'

async function getAllSongs(req: Request, resp: Response) {
  console.log('Fetch all songs called')

  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const skip = (page - 1) * limit

  const [songs, total] = await Promise.all([
    SongModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    SongModel.countDocuments(),
  ])

  const totalPages = Math.ceil(total / limit)

  resp.status(200).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'FETCH_ALL_SONGS_SUCCESS',
    data: SongConverter.toDtoArray(songs),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
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

async function addMultipleSongs(req: Request, resp: Response) {
  console.log('Add multiple songs called')

  const songs: CreateSongDto[] = req.body
  const addedSongs = []

  for (const songData of songs) {
    const existingSong = await SongModel.findOne({
      title: songData.title.trim(),
    })

    if (!existingSong) {
      const tempSongDoc = new SongModel({
        title: songData.title.trim(),
        artist: songData.artist.trim(),
        album: songData.album.trim(),
        genre: songData.genre.trim(),
      })

      const savedSong = await tempSongDoc.save()
      addedSongs.push(SongConverter.toDto(savedSong))
    }
  }

  resp.status(201).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'ADD_MULTIPLE_SONGS_SUCCESS',
    data: addedSongs,
  })
}

async function updateSong(req: Request, resp: Response) {
  try {
    const songId = req.params.song_id
    const updateData: UpdateSongDto = req.body

    const updateFields: any = {}
    if (updateData.title) updateFields.title = updateData.title.trim()
    if (updateData.artist) updateFields.artist = updateData.artist.trim()
    if (updateData.album) updateFields.album = updateData.album.trim()
    if (updateData.genre) updateFields.genre = updateData.genre.trim()

    const updatedSong = await SongModel.findByIdAndUpdate(
      songId,
      updateFields,
      { new: true }
    )

    if (!updatedSong) {
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
      message: 'UPDATE_SONG_SUCCESS',
      data: SongConverter.toDto(updatedSong),
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

async function getMetadata(req: Request, resp: Response) {
  try {
    const [totalSongs, uniqueArtists, uniqueAlbums] = await Promise.all([
      SongModel.countDocuments(),
      SongModel.distinct('artist').then((artists) => artists.length),
      SongModel.distinct('album').then((albums) => albums.length),
    ])

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'FETCH_METADATA_SUCCESS',
      data: {
        totalSongs,
        uniqueArtists,
        uniqueAlbums,
      },
    })
  } catch (error) {
    resp.status(500).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'FETCH_METADATA_FAILED',
      data: undefined,
    })
  }
}

async function getArtistStats(req: Request, resp: Response) {
  try {
    const artistStats = await SongModel.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'FETCH_ARTIST_STATS_SUCCESS',
      data: artistStats.map((item) => ({ name: item._id, count: item.count })),
    })
  } catch (error) {
    resp.status(500).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'FETCH_ARTIST_STATS_FAILED',
      data: undefined,
    })
  }
}

async function getAlbumStats(req: Request, resp: Response) {
  try {
    const albumStats = await SongModel.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'FETCH_ALBUM_STATS_SUCCESS',
      data: albumStats.map((item) => ({ name: item._id, count: item.count })),
    })
  } catch (error) {
    resp.status(500).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'FETCH_ALBUM_STATS_FAILED',
      data: undefined,
    })
  }
}

async function getSongsByArtist(req: Request, resp: Response) {
  try {
    const artist = req.params.artist
    const songs = await SongModel.find({ artist }).sort({ createdAt: -1 })

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'FETCH_SONGS_BY_ARTIST_SUCCESS',
      data: SongConverter.toDtoArray(songs),
    })
  } catch (error) {
    resp.status(500).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'FETCH_SONGS_BY_ARTIST_FAILED',
      data: undefined,
    })
  }
}

async function getSongsByAlbum(req: Request, resp: Response) {
  try {
    const album = req.params.album
    const songs = await SongModel.find({ album }).sort({ createdAt: -1 })

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'FETCH_SONGS_BY_ALBUM_SUCCESS',
      data: SongConverter.toDtoArray(songs),
    })
  } catch (error) {
    resp.status(500).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'FETCH_SONGS_BY_ALBUM_FAILED',
      data: undefined,
    })
  }
}

async function getSongsByGenre(req: Request, resp: Response) {
  try {
    const genre = req.params.genre
    const songs = await SongModel.find({ genre }).sort({ createdAt: -1 })

    resp.status(200).json({
      timestamp: new Date().toISOString(),
      isError: false,
      message: 'FETCH_SONGS_BY_GENRE_SUCCESS',
      data: SongConverter.toDtoArray(songs),
    })
  } catch (error) {
    resp.status(500).json({
      timestamp: new Date().toISOString(),
      isError: true,
      message: 'FETCH_SONGS_BY_GENRE_FAILED',
      data: undefined,
    })
  }
}

export {
  getAllSongs,
  getSong,
  addSong,
  addMultipleSongs,
  updateSong,
  deleteSong,
  getMetadata,
  getArtistStats,
  getAlbumStats,
  getSongsByArtist,
  getSongsByAlbum,
  getSongsByGenre,
}
