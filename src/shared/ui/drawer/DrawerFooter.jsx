//this is the drawer footer component which will be used to handle the drawer footer of the drawer component
import React from 'react'

const DrawerFooter = ({children, className = "" , drawerFooterProps = {}}) => {
  return (
    <div className={className} {...drawerFooterProps}>{children}</div>
  )
}

export default DrawerFooter