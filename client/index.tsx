import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route } from 'react-router'

import App from './components/app'
import LoginForm from './components/login-form'
import SignupForm from './components/signup-form'
import Dashboard from './components/dashboard'
import requireAuth from './components/require-auth'

const networkInterface = createHttpLink({
  uri: '/graphql'
})

const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => object.id || null
})

const client = new ApolloClient({ link: networkInterface, cache })

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
