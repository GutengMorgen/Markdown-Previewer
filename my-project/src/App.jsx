// import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className='Container'>
      <div>
        <label htmlFor="editor"></label>
        <textarea id="editor" cols="30" rows="10"></textarea>
      </div>
      <div>
        <label htmlFor='preview'></label>
        <textarea id="preview" cols="30" rows="10"></textarea>
      </div>
    </div>
  )
}

export default App
