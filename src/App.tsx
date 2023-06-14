import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function MyApp() {
  return (
    <div className="App" id="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default MyApp;
