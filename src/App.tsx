import './App.css'
import { LoginModal, Navbar } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Ventas from './pages/Ventas'
import Preps from './pages/Preps'
import Admin from './pages/Admin'
import Users from './pages/Users'
import Inventory from './pages/Inventory'
import DailyOps from './pages/DailyOps'
import UserProfile from './pages/UserProfile'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <main>
          <div className="main" >
            <div className="gradient"/>
          </div>

          <div className="app" >
            <Navbar/>
            <LoginModal />
            <Routes>
              <Route path='/ventas' element={<Ventas/>}/>
              <Route path='/preps' element={<Preps/>}/>

              <Route path='/admin' element={<Admin/>}>
                <Route path='users' element={<Users/>}/>
                <Route path='users/:user' element={<UserProfile/>}/>
                <Route path='inventory' element={<Inventory/>}/>
                <Route path='daily-ops' element={<DailyOps/>}/>
              </Route>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
