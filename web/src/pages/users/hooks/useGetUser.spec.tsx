import React, { ReactElement } from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { GetUserDocument } from '../../../generated/graphql'
import { useGetUser } from './useGetUser'
import { act, render } from '@testing-library/react'

describe('useGetUser', () => {
  it('should get user properly', async () => {
    const mocks = [
      {
        request: {
          query: GetUserDocument,
          variables: {
            id: '1',
          },
        },
        result: {
          data: {
            user: {
              id: '1',
              avatar: 'https://avatar.com/image.png',
              name: 'User Name',
              description: 'Description',
              latitude: -1,
              longitude: 30,
              address: '5th Avenue',
            },
          },
        },
      },
    ]

    const User = ({ id }: { id: string }): ReactElement => {
      const { loading, user } = useGetUser(id)
      if (loading) return <>Loading</>
      return (
        <div>
          Name: {user?.name}
          Address: {user?.address}
        </div>
      )
    }

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <User id="1" />
      </MockedProvider>,
    )

    expect(getByText(/Loading/i)).toBeInTheDocument()

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)) // wait for response
    })

    expect(getByText(/User Name/i)).toBeInTheDocument()
    expect(getByText(/5th Avenue/i)).toBeInTheDocument()
  })
})
