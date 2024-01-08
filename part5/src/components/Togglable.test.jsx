import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('Toggable tests', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable showButtonLabel='show' hideButtonLabel='hide'>
        <div className='testDiv' >
                    togglable content
        </div>
      </Togglable>
    ).container
  })
  test('renders url and likes when show is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const content = container.querySelector('.togglable')
    expect(content).not.toHaveStyle('display: none')
  })

  test('hides url and like when hide is clicked', async () => {
    const user = userEvent.setup()
    const show = screen.getByText('show')
    await user.click(show)
    const hide = screen.getByText('hide')
    await user.click(hide)
    const content = container.querySelector('.togglable')
    expect(content).toHaveStyle('display: none')
  })
})