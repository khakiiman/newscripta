import { Routes, Route } from 'react-router-dom';

import Header from "./components/layouts/Header";
import Footer from './components/layouts/Footer';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';

function App() {
  return (
   <main className='flex flex-col min-h-screen justify-between'>
    <Header />
    <Routes>
      <Route path="/"  element={<Home />}/>
      <Route path="/auth"  element={<Auth />}/> 
    </Routes>
    <Footer />
   </main>
  )
}

export default App;