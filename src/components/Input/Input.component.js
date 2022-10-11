import React from 'react';

const Input = ({ selected, corrects, handleChangeInput, playing }) => {

  return (
    <div className="input-container">
      {selected.split('').map((letter, i) => {
        return (
            <input key={i} onChange={handleChangeInput} disabled={corrects.includes(letter) || !playing} value={corrects.includes(letter) ? letter : ''} />
        )
      })}
    </div>
  )
}

export default Input
