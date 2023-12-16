import { useState } from 'react'
import   {BrowserRouter as Router,Routes,Route,useLocation} from "react-router-dom"
import Header from "./components/Header"
import Coin from "./components/Coin"
import CoinDetails from "./components/CoinDetails"
import Home from "./components/Home"
import Exchange from "./components/Exchange"
import Footer from './components/Footer'
import { Tilt } from '@jdion/tilt-react'


function App() {

  return (
    <>
   <Router>
   <Header/>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/coins" element={<Coin/>}/>
      <Route  path="/exchanges" element={<Exchange/>}/>
      <Route  path="/coin/:id" element={<CoinDetails/>}/>
    </Routes>
   </Router>

   <Footer/>
    </>
  );
}

export default App
