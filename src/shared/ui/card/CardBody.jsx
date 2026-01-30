//this is the card body component which will be used to handle the card body of the card component
import React from 'react'

const CardBody = ({children, className = "" , cardBodyProps = {}}) => {
  return (
    <div className={className} {...cardBodyProps}>{children}</div>
  )
}

export default CardBody