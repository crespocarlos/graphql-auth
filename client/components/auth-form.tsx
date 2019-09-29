import React, { useState } from 'react'

type AuthFormProps = {
  errors: Array<string>
  onAuthSubmit: (email: string, password: string) => void
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSubmit, errors }) => {
  const [state, setState] = useState({ email: '', password: '' })

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onAuthSubmit(state.email, state.password)
  }

  return (
    <div className="row">
      <form onSubmit={onSubmit} className="col s6">
        <div className="input-field">
          <input
            placeholder="Email"
            value={state.email}
            onChange={e => setState({ ...state, email: e.target.value })}
          />
        </div>
        <div className="input-field">
          <input
            placeholder="Password"
            type="password"
            value={state.password}
            onChange={e => setState({ ...state, password: e.target.value })}
          />
        </div>
        <div className="errors">
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  )
}

export default AuthForm
