import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProList from './Components/ProList';
import ProForm from './Components/ProForm';
import ProDetails from './Components/ProDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProList/>} />
        <Route path='add/' element={<ProForm/>} />
        <Route path='/product/:id' element={<ProDetails/>} />
        <Route path='/edit/:id' element={<ProForm/>} />
      </Routes>
    </Router>
  )
}

export default App