import React from 'react'

const Wrongs = ({wrongs}) => {
  return (
    <h4 className='wrongs-text'>Wrongs: {wrongs?.join(', ') || "-"}</h4>
  )
}

export default Wrongs