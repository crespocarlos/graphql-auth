import React from 'react'
import { Link } from 'react-router'
import currentUserQuery, { CurrentUserResponse } from '../queries/currentUser'
import logout from '../mutations/logout'
import { useMutation, useQuery } from '@apollo/react-hooks'

const Header = () => {
  const [logoutMutation] = useMutation<CurrentUserResponse>(logout)
  const { loading, data } = useQuery<CurrentUserResponse>(currentUserQuery, {
    notifyOnNetworkStatusChange: true
  })

  const onLogoutClick = () => {
    logoutMutation({
      refetchQueries: [{ query: currentUserQuery }]
    })
  }

  const renderButtons = () => {
    if (loading) {
      return <div />
    }

    if (data && data.user) {
      return (
        <li>
          <a onClick={onLogoutClick}>Logout</a>
        </li>
      )
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      )
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  )
}

export default Header
