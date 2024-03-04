import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(


  // <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer/>
      <App />
    </AuthContextProvider>
  //  </React.StrictMode>,
)
