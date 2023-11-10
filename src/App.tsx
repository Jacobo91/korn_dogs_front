import './App.css'
import { LoginModal, Navbar } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ventas from './pages/Ventas'
import Preps from './pages/Preps'
import Admin from './pages/Admin'
import Users from './pages/Users'
import Inventory from './pages/Inventory'
import PageNotFound from './pages/PageNotFound'
import DailyOps from './pages/DailyOps'
import UserProfile from './pages/UserProfile'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
              <Route path='/' element={<Home/>}/>
              <Route path='/ventas' element={<Ventas/>}/>
              <Route path='/preps' element={<Preps/>}/>

              <Route path='/admin' element={<Admin/>}>
                <Route path='users' element={<Users/>}/>
                <Route path='users/:user' element={<UserProfile/>}/>
                <Route path='inventory' element={<Inventory/>}/>
                <Route path='daily-ops' element={<DailyOps/>}/>
              </Route>
              <Route path='*' element={<PageNotFound/>} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
