//this is the card bottom component which will be used to handle the card bottom of the card component
import React from 'react'

const CardBottom = ({children, className = "" , cardBottomProps = {}}) => {
  return (
    <div className={className} {...cardBottomProps}>{children}</div>
  )
}

export default CardBottom