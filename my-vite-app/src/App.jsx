import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BrowserIndex from './components/browserIndex/BrowserIndex'
import SearchBar from './components/Searchbar/Searchbar'
// import MainContent from './components/MainContent/MainContent'

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
      <div>
        <p className='border-2 text-red-700 p-4'>hello </p>
        
        <SearchBar/>

      </div>
    </>
  )
}

export default App
