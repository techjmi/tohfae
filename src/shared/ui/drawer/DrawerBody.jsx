//this is the drawer body component which will be used to handle the drawer body of the drawer component
import React from 'react'

const DrawerBody = ({children, className = "" , drawerBodyProps = {}}) => {
  return (
    <div className={className} {...drawerBodyProps}>{children}</div>
  )
}

export default DrawerBody