import { Routes, Route } from 'react-router-dom';

import Header from "./components/layouts/Header";
import Footer from './components/layouts/Footer';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';

function App() {
  return (
   <>
    <Header />
    <Routes>
      <Route path="/"  element={<Home />}/>
      <Route path="/auth"  element={<Auth />}/> 
    </Routes>
    <Footer />
   </>
  )
}

export default App;