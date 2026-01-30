//this is the modal body component which will be used to handle the modal body of the modal component
import React from 'react'

const ModalBody = ({children, className = "" , modalBodyProps = {}}) => {
  return (
    <div className={className} {...modalBodyProps}>{children}</div>
  )
}

export default ModalBody