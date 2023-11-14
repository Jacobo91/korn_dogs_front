import './App.css'
import { lazy, Suspense } from 'react';
import { LoginModal, Navbar } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const Home = lazy(() => import('./pages/Home'));
const Ventas = lazy(() => import('./pages/Ventas'));
const Preps = lazy(() => import('./pages/Preps'));
const Admin = lazy(() => import('./pages/Admin'));
const Users = lazy(() => import('./pages/Users'));
const Inventory = lazy(() => import('./pages/Inventory'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const DailyOps = lazy(() => import('./pages/DailyOps'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
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
            <Suspense fallback={<div>Loading...</div>} >
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
            </Suspense>
          </div>
        </main>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
