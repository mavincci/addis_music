import { AppBar } from '../components/app-bar'
import { SongsList } from '../components/song-list'
import { SongMetadata } from '../components/song-metadata'

const demoSongs = [
  {
    _id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Pop',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    _id: '2',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    album: '21',
    genre: 'Soul',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10'),
  },
  {
    _id: '3',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    genre: 'Rock',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05'),
  },
  {
    _id: '4',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    genre: 'Pop',
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-04-20'),
  },
]

export const HomePage = () => {
  const handleDeleteSong = (id: string) => {
    console.log('Delete song with id:', id)
  }

  const handleEditSong = (song: any) => {
    console.log('Edit song:', song)
  }

  return (
    <>
      <AppBar />
      <SongMetadata />
      <SongsList
        songs={demoSongs}
        onDeleteSong={handleDeleteSong}
        onEditSong={handleEditSong}
      />
    </>
  )
}
