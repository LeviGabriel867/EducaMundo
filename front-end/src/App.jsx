import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './components/Pages/Welcome/HomePage.jsx'
import Intro from './components/Pages/Introduction/Intro.jsx'
import ServicesSystem from './components/Pages/servicesSystem/ServicesSystem.jsx';
import './App.css';

function App() {
  

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='/Intro' element = {<Intro/>}/>
          <Route path='/Services' element={<ServicesSystem/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
