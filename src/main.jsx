import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import router from '../src/router/Router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>
)
