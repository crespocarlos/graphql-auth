import gql from 'graphql-tag'

export type CurrentUserResponse = {
  user: { id: string; email: string }
}

export default gql`
  {
    user {
      id
      email
    }
  }
`
