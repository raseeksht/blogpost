import { useState } from 'react'
import './App.css'
import { Button } from 'flowbite-react'
import {
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import ModalContextProvider from './context/ModalContext';
import AlertContextProvider from './context/AlertContext';
import AuthContextProvider from './context/AuthContext';

import ShowAlert from './components/Alert'
import IndividualBlog from './components/IndividualBlog';
import CreateBlogModal from './components/modals/CreateBlogModal';
import CustomNavbar from './components/CustomNavbar';
import LoginComponent from './components/LoginComponent';
import About from './components/About';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ModalContextProvider>
        <AlertContextProvider>
          <AuthContextProvider>


            <ShowAlert />
            <CustomNavbar />
            <Routes>
              <Route path='/' Component={Home} />
              <Route path='/about' Component={About} />
              <Route path="/blog/:blogId" Component={IndividualBlog} />
              <Route path='/login' Component={LoginComponent} />
            </Routes>
            <CreateBlogModal />


          </AuthContextProvider>
        </AlertContextProvider>
      </ModalContextProvider>
    </>
  )
}

export default App
