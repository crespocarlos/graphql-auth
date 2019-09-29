import { GraphQLObjectType } from 'graphql'
import UserType from './userType'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(_, _args, req) {
        return req.user
      }
    }
  }
})

export default RootQueryType
