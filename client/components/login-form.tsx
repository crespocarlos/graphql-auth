import React, { useState, useEffect } from 'react'
import AuthForm from './auth-form'
import login from '../mutations/login'
import { useQuery, useMutation } from 'react-apollo'
import currentUserQuery, { CurrentUserResponse } from '../queries/currentUser'
import { hashHistory } from 'react-router'

const LoginForm = () => {
  const [errors, setErrors] = useState<Array<string>>([])
  const [loginMutation] = useMutation<CurrentUserResponse>(login, {
    refetchQueries: [{ query: currentUserQuery }]
  })

  const { loading, data } = useQuery<CurrentUserResponse>(currentUserQuery, {
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (!loading && data && data.user) {
      hashHistory.push('/dashboard')
    }
  }, [data, loading])

  const onSubmit = async (email: string, password: string) => {
    try {
      await loginMutation({
        variables: { email, password },
        refetchQueries: [{ query: currentUserQuery }]
      })
    } catch (e) {
      const errors = e.graphQLErrors.map((error: any) => error.message)
      setErrors(errors)
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <AuthForm errors={errors} onAuthSubmit={onSubmit} />
    </div>
  )
}

export default LoginForm
