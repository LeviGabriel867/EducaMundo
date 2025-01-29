import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './components/Pages/Welcome/HomePage.jsx'
import Intro from './components/Pages/Introduction/Intro.jsx'
import ServicesSystem from './components/Pages/servicesSystem/ServicesSystem.jsx';
import Activities from './components/Pages/activities/Activities.jsx'
import InteractiveVideos from './components/Pages/interactiveVideos/InteractiveVideos.jsx'
import Suggestions from './components/Pages/suggestions/Suggestions.jsx'
import './App.css';

function App() {
  

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='/Intro' element = {<Intro/>}/>
          <Route path='/Services' element={<ServicesSystem/>}/>
          <Route path='/Activities' element={<Activities/>}/>
          <Route path='/InteractiveVideos' element={<InteractiveVideos/>}/>
          <Route path='/Suggestions' element={<Suggestions/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
