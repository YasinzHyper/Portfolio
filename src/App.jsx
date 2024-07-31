import { useState } from 'react'
import './App.css'
import Navbar from './components/NavBar/NavBar.jsx'
import Intro from './components/Intro/Intro.jsx'
import Skills from './components/Skills/Skills.jsx'
import Contact from './components/Contact/Contact.jsx'
import Projects from './components/Projects/Projects.jsx'
import { BottomDock } from './components/Dock/Dock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar/>
      <Intro/>
      <Skills/>
      <Projects/>
      <Contact/>
      <BottomDock/>
    </div>
  )
}

export default App
