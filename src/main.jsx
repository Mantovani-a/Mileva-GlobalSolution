import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import 'leaflet/dist/leaflet.css'
import './styles/main.scss'
import './styles/app-visual.scss'
import App from './App.jsx'
import { syncThemeFromStorage } from './utils/theme.js'

syncThemeFromStorage()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
