import mongoose from 'mongoose'

const songSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    album: String,
    genre: String,
  },
  {
    timestamps: true,
  }
)

export const SongModel = mongoose.model('Song', songSchema)
