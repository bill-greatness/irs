
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Profiles  from './pages/Profiles.jsx'
import Login from './pages/Login'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
   <Route index path="/login" element={<Login/>} />
     <Route path="" element={<App />} >
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/history" element={<History />} /> 
        <Route path="/profiles" element={<Profiles />} /> 
     </Route>
  </Routes>
  </BrowserRouter>,
)
