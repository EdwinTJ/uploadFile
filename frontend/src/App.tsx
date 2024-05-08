import React from 'react'
import './App.css'

function App() {

  const handleInputChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
    const file = event.target.files?.[0]
    console.log(file)
  }
  return (
    <>
      <h4>Upload Challenge</h4>
      <div>
      <form>
        <label>
        <input onChange={handleInputChange} name="file" type="file" accept='.csv'/>
        </label>

        <button>
          Upload File
        </button>
      </form>
      </div>
    </>
  )
}

export default App
