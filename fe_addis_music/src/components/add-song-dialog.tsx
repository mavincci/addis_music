import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { MdClose } from 'react-icons/md'

interface AddSongDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (song: {
    title: string
    artist: string
    album: string
    genre: string
  }) => void
  error?: string | null
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

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-bottom: 12px;
  padding: 8px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`

export const AddSongDialog = ({
  isOpen,
  onClose,
  onSave,
  error,
}: AddSongDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  })

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal()
      setFormData({ title: '', artist: '', album: '', genre: '' })
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
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
          Add New Song
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

      {error && <ErrorMessage>{error}</ErrorMessage>}

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
            Add Song
          </Button>
        </ButtonGroup>
      </Form>
    </StyledDialog>
  )
}
