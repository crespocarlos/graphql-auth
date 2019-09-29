import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import currentUserQuery, { CurrentUserResponse } from '../queries/currentUser'
import { hashHistory } from 'react-router'

export default <T extends object>(
  WrappedComponent: React.JSXElementConstructor<T>
) => {
  const RequireAuth = (props: T) => {
    const { loading, data } = useQuery<CurrentUserResponse>(currentUserQuery, {
      notifyOnNetworkStatusChange: true
    })

    useEffect(() => {
      if (!loading && (!data || !data.user)) {
        hashHistory.push('/login')
      }
    }, [loading, data])

    return <WrappedComponent {...props} />
  }

  return RequireAuth
}
