import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';

function MyApp() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default MyApp;
