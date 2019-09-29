import React from 'react'
import Header from './Header'

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  )
}

export default App
