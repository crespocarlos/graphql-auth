import React, { useState, useEffect } from 'react'
import AuthForm from './auth-form'
import { useMutation, useQuery } from 'react-apollo'
import signup from '../mutations/signup'
import currentUserQuery, { CurrentUserResponse } from '../queries/currentUser'
import { hashHistory } from 'react-router'

type SignupVariables = {
  email: string
  password: string
}

const SignupForm = () => {
  const [errors, setErrors] = useState<Array<string>>([])
  const [signupMutation] = useMutation<CurrentUserResponse, SignupVariables>(
    signup,
    {
      refetchQueries: [{ query: currentUserQuery }]
    }
  )

  const { loading, data } = useQuery<CurrentUserResponse>(currentUserQuery, {
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (!loading && data && data.user) {
      hashHistory.push('/dashboard')
    }
  }, [loading, data])

  const onSubmit = async (email: string, password: string) => {
    try {
      await signupMutation({
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
      <h3>Sign Up</h3>
      <AuthForm errors={errors} onAuthSubmit={onSubmit} />
    </div>
  )
}

export default SignupForm
