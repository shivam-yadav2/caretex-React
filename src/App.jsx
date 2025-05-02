import { useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import 'lenis/dist/lenis.css';

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
