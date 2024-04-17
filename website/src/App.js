import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Layout from './pages/Layout';
import Policy from './pages/Policy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path='policy' element={<Policy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
