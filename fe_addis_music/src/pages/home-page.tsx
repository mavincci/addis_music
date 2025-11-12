import { AppBar } from '../components/app-bar'
import { SongsList } from '../components/song-list'
import { SongMetadata } from '../components/song-metadata'

export const HomePage = () => {
  return (
    <>
      <AppBar />
      <SongMetadata />
      <SongsList />
    </>
  )
}
