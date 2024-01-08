import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  user: {
    username: 'kamisl',
    name: 'Ramya K R',
    id: '654a56cacceb408de68ecd'
  },
  id: '654a56cacced808de63dec'
}

const user = {
  username: 'kamisl',
  name: 'Ramya K R',
  id: '654a56cacceb408de68ecd'
}

test('renders blog\'s title and author without url and likes', async () => {

  await render(<Blog blog={blog} user={user} />)
  const title = screen.getByText('Type wars')
  const author = screen.getByText('Robert C. Martin')
  const url = screen.queryByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
  const likes = screen.queryByText('likes 2')
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toHaveStyle('display: none')
  expect(likes).toHaveStyle('display: none')

})

test('button pressed twice', async () => {
  const mockHandler = jest.fn()
  await render(<Blog blog={blog} user={user} updateLike={mockHandler}/>)
  const event = userEvent.setup()
  const like = screen.getByText('like')
  console.log(like)
  await event.click(like)
  await event.click(like)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
