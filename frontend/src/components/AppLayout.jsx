import React from 'react'
import Header from './Header';


const AppLayout = ({ children }) => {
  return (
    <div>
        <Header />
        <main>{children}</main>
    
    </div>
  )
}

export default AppLayout;