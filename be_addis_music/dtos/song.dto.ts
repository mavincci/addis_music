export interface SongDto {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateSongDto {
  title: string
  artist: string
  album: string
  genre: string
}

export interface UpdateSongDto {
  title?: string
  artist?: string
  album?: string
  genre?: string
}

export class SongConverter {
  static toDto(song: any): SongDto {
    return {
      _id: song._id.toString(),
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
    }
  }

  static toDtoArray(songs: any[]): SongDto[] {
    return songs.map((song) => this.toDto(song))
  }
}
