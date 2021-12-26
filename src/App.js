import { BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from './Navbar';
import AppRoutes from "./AppRoutes";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='app'>
      <BrowserRouter >
        <Navbar />
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
