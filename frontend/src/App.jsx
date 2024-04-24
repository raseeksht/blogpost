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
import ShowAlert from './components/Alert'
import IndividualBlog from './components/IndividualBlog';
import CreateBlogModal from './components/modals/CreateBlogModal';
import CustomNavbar from './components/CustomNavbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ModalContextProvider>
        <AlertContextProvider>
          <ShowAlert />
          <CustomNavbar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path="/blog/:blogId" Component={IndividualBlog} />
          </Routes>
          <CreateBlogModal />

        </AlertContextProvider>

      </ModalContextProvider>
    </>
  )
}

export default App
