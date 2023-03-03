import React from 'react'

const InputForm = ({ handleSubmit, prompt, setPrompt }) => {
  return (
    <div>
        <form onSubmit={handleSubmit} className='form'>
        <input type="text"
        className='input'
        placeholder='Enter a message'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === 'ENTER' ? handleSubmit : null}
        />
        <button className='sendButton'>Send</button>
      </form>
    </div>
  )
}

export default InputForm