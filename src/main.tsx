import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router'
import './index.css'
import './nav.css'
import'./css/Home.css'

import { InventoryProvider } from './context/InventoryContext' 
// import App from './App.tsx'
import Home from './pages/Home.tsx'
import Inventory from './pages/Inventory.tsx'
import Alerts from './pages/Alerts.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import Nave from './components/Nav.tsx'
import './css/Inventory.css'



const router= createBrowserRouter([{
  path:'/',
  Component: Nave,
  children: [
    {index: true, Component: Home},
    {path: 'productdetail/:id',Component:ProductDetail},
    {path: 'inventory', Component: Inventory},
    {path: 'alerts', Component: Alerts},
    
  ]
},])


const root = document.getElementById ('root')!
 ReactDom.createRoot(root).render(
  <StrictMode>
    <InventoryProvider>
    <RouterProvider  router={router}/>
    </InventoryProvider>
  </StrictMode>
 )


