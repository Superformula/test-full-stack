export interface User {
  id: string
  name: string
  avatar: string
  description: string
}
interface Users {
  users: User[]
  loading: boolean
}

export const useGetUsers = (): Users => {
  return {
    loading: false,
    users: [
      {
        id: 'F2ChA2c3',
        name: 'Jessica May',
        avatar: 'https://source.unsplash.com/400x400/?women&v=1',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 'a87Cljk43',
        name: 'John Doe',
        avatar: 'https://source.unsplash.com/400x400/?men&v=1',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        id: '1d2h892fh',
        name: 'Michael Douglas',
        avatar: 'https://source.unsplash.com/400x400/?men&v=2',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 'F2ChA2c3',
        name: 'Jessica May',
        avatar: 'https://source.unsplash.com/400x400/?women&v=3',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 'a87Cljk43',
        name: 'John Doe',
        avatar: 'https://source.unsplash.com/400x400/?men&v=3',
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        id: '1d2h892fh',
        name: 'Michael Douglas',
        avatar: 'https://source.unsplash.com/400x400/?men&v=4',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
  }
}
