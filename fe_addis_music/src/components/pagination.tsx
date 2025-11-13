import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  limit: number
  onLimitChange: (limit: number) => void
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const LimitSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const PageNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const LimitSelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 14px;
`

const PageButton = styled.button<{ active?: boolean }>`
  border: 1px solid #ccc;
  background-color: ${(props) => (props.active ? '#007bff' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#333')};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  min-width: 36px;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#f5f5f5')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getVisiblePages()

  return (
    <PaginationContainer>
      <LimitSelector>
        <span>Show:</span>
        <LimitSelect
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </LimitSelect>
        <span>per page</span>
      </LimitSelector>

      <PageNavigation>
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdChevronLeft size={16} />
        </PageButton>

        {visiblePages.map((page) => (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ))}

        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <MdChevronRight size={16} />
        </PageButton>
      </PageNavigation>
    </PaginationContainer>
  )
}
