//this is the modal header component which will be used to handle the modal header of the modal component
import React from 'react'

const ModalHeader = ({children, className = "" , modalHeaderProps = {}}) => {
  return (
    <div className={className} {...modalHeaderProps}>{children}</div>
  )
}

export default ModalHeader