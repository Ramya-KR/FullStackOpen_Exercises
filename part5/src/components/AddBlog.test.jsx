import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

test('renders add blog properly', async () => {
  const addBlog = jest.fn()
  const event = userEvent.setup()

  render(<AddBlog createBlog={addBlog}/>)
  const title = screen.getByPlaceholderText('title')
  await event.type(title,'how to write blogs')
  const author = screen.getByPlaceholderText('author')
  await event.type(author,'Prashanth')
  const url = screen.getByPlaceholderText('url')
  await event.type(url,'https://www.howtowriteblogs.com')
  const button = screen.getByText('create')
  await event.click(button)
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].author).toBeDefined()
  expect(addBlog.mock.calls[0][0].title).toBeDefined()
  expect(addBlog.mock.calls[0][0].url).toBeDefined()
})