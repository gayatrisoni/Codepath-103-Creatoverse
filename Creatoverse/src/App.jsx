// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import './App.css';
// src/index.js
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowCreators />} />
      <Route path="/creator/:id" element={<ViewCreator />} />
      <Route path="/edit/:id" element={<EditCreator />} />
      <Route path="/new" element={<AddCreator />} />
    </Routes>
  );
}

export default App;
