import { AppBar } from '../components/app-bar'
import { SongMetadata } from '../components/song-metadata'

export const HomePage = () => {
  return (
    <>
      <AppBar />
      <SongMetadata />
      <section>Songs list</section>
    </>
  )
}
