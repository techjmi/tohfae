//this is the drawer header component which will be used to handle the drawer header of the drawer component
import React from 'react'

const DrawerHeader = ({children, className = "" , drawerHeaderProps = {}}) => {
  return (
    <div className={className} {...drawerHeaderProps}>{children}</div>
  )
}

export default DrawerHeader