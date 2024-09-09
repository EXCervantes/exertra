import './lib/MockLocation.js'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LoginForm from './pages/Login.jsx'


const router = createBrowserRouter({
  {
    path: '/',
    element: <App/>,
    error: <Error/>,
    children: [
      {
        index: true,
        element: <Home/>
      }, {
        path: '/login',
        element: <LoginForm/>
      }, {
        path: '/signup'
      }
    ]
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
