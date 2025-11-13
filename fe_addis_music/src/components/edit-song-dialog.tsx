import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { MdClose } from 'react-icons/md'

interface Song {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  createdAt: Date
  updatedAt: Date
}

interface EditSongDialogProps {
  song: Song | null
  onClose: () => void
  onSave: (song: Song) => void
}

const StyledDialog = styled.dialog`
  border: none;
  border-radius: 8px;
  padding: 16px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
`

const Button = styled.button<{ variant?: 'primary' }>`
  border: 1px solid
    ${(props) => (props.variant === 'primary' ? '#007bff' : '#ccc')};
  background-color: ${(props) =>
    props.variant === 'primary' ? '#007bff' : 'white'};
  color: ${(props) => (props.variant === 'primary' ? 'white' : '#333')};
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary' ? '#0056b3' : '#f5f5f5'};
  }
`

export const EditSongDialog = ({
  song,
  onClose,
  onSave,
}: EditSongDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [formData, setFormData] = useState({
    title: song?.title || '',
    artist: song?.artist || '',
    album: song?.album || '',
    genre: song?.genre || '',
  })

  useEffect(() => {
    if (song && dialogRef.current) {
      dialogRef.current.showModal()
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
      })
    } else if (!song && dialogRef.current) {
      dialogRef.current.close()
    }
  }, [song])

  if (!song) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...song,
      ...formData,
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <StyledDialog ref={dialogRef} onClose={onClose}>
      <Header>
        <h3
          className={css`
            margin: 0;
          `}
        >
          Edit Song
        </h3>
        <button
          type='button'
          onClick={onClose}
          className={css`
            border: none;
            background: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              background-color: #f5f5f5;
            }
          `}
        >
          <MdClose size={20} />
        </button>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label>Title</Label>
          <Input
            type='text'
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label>Artist</Label>
          <Input
            type='text'
            value={formData.artist}
            onChange={(e) => handleChange('artist', e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label>Album</Label>
          <Input
            type='text'
            value={formData.album}
            onChange={(e) => handleChange('album', e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label>Genre</Label>
          <Input
            type='text'
            value={formData.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            required
          />
        </FormField>

        <ButtonGroup>
          <Button type='button' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' variant='primary'>
            Save
          </Button>
        </ButtonGroup>
      </Form>
    </StyledDialog>
  )
}
