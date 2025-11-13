import { useEffect, useRef } from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { MdClose } from 'react-icons/md'

interface MetadataItem {
  name: string
  count: number
}

interface MetadataDialogProps {
  isOpen: boolean
  title: string
  items: MetadataItem[]
  onClose: () => void
}

const StyledDialog = styled.dialog`
  border: none;
  border-radius: 8px;
  padding: 16px;
  width: 500px;
  max-width: 90vw;
  max-height: 80vh;
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

const ItemsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`

const ItemName = styled.span`
  font-weight: 500;
`

const ItemCount = styled.span`
  background-color: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`

export const MetadataDialog = ({
  isOpen,
  title,
  items,
  onClose,
}: MetadataDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal()
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <StyledDialog ref={dialogRef} onClose={onClose}>
      <Header>
        <h3
          className={css`
            margin: 0;
          `}
        >
          {title}
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

      <ItemsList>
        {items.map((item, index) => (
          <Item key={index}>
            <ItemName>{item.name}</ItemName>
            <ItemCount>{item.count}</ItemCount>
          </Item>
        ))}
      </ItemsList>
    </StyledDialog>
  )
}
