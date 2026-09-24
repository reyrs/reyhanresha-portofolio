import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PreLoader from './components/PreLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* reducedMotion="user": motion animations follow the OS "reduce motion" setting */}
    <MotionConfig reducedMotion="user">
      <PreLoader/>
      <div className="container mx-auto">
        <Navbar />
        <App />
        <Footer/>
      </div>
    </MotionConfig>
  </StrictMode>,
)
