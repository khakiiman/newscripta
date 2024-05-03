import { Routes, Route } from 'react-router-dom';

import Header from "./components/layouts/Header";
import Footer from './components/layouts/Footer';
import Home from './components/pages/Home';


function App() {
  return (
   <>
    <Header />
    <Routes>
      <Route path="/"  element={<Home />}/>
    </Routes>
    <Footer />
   </>
  )
}

export default App;