import { render, screen, fireEvent } from '@testing-library/react'
import * as utils from '../components/DownloadButton/utils'
import DownloadButton from '../components/DownloadButton/DownloadButton'

describe('DownloadButton', () => {
  it('renders the button', () => {
    render(<DownloadButton />)
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
  })
  it('calls fetchEmployees on click', async () => {
    const spy = vi.spyOn(utils, 'fetchEmployees').mockResolvedValueOnce()
    render(<DownloadButton />)
    fireEvent.click(screen.getByRole('button', { name: /download/i }))
    expect(spy).toHaveBeenCalled()
  })
})
