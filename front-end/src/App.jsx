import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './components/Pages/Welcome/HomePage.jsx'
import Intro from './components/Pages/Introduction/Intro.jsx'
import './App.css';

function App() {
  

  return (
    <Router>
      <div>
        {/*<nav>
          <a href="/">Home</a>
          <div>
            <a href='/contact'>Contact</a>
          </div>
        </nav>
        */}
        <Routes>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='/Intro' element = {<Intro/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
