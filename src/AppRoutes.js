import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import AddPost from './AddPost';

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Posts />} />
      <Route exact path="/add" element={<AddPost />} />
    </Routes>
  )
}

export default AppRoutes