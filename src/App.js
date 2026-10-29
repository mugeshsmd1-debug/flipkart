import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MobileNav from './components/MobileNav';
import FlipkartCategoryNav from './components/FlipkartCategoryNav';
import SimpleSlider from './components/HeroCarousel';
import HeroSection from './components/HeroSection';
import Products from './components/Products';
import SinglePage from "./components/SinglePage";
import CartHold from './components/CartHold';
import SPFooter from './components/SPFooter';
import Under20 from './components/Under20';
import Under10 from './components/Under10';
import ForHer from './components/ForHer';
import ForHim from './components/ForHim';
import AffiliateLandingPage from './components/AffiliateLandingPage';

function App() {
  return (
    <div className="App bg-[#f1f3f6] min-h-screen text-[#212121]">
      <BrowserRouter>
        <NavBar />
        <MobileNav />
        <FlipkartCategoryNav />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SimpleSlider />
                <HeroSection />
                <Products />
                <SPFooter />
              </>
            }
          />
          <Route path="/:id" element={<AffiliateLandingPage />} />
          <Route path="/deal/:id" element={<AffiliateLandingPage />} />
          <Route path="/landing/:id" element={<AffiliateLandingPage />} />
          <Route path="/affiliate/:id" element={<AffiliateLandingPage />} />
          <Route path="/product/:id" element={<SinglePage />} />
          <Route path="/cart" element={<CartHold />} />
          <Route path="/under20" element={<Under20 />} />
          <Route path="/under40" element={<Under10 />} />
          <Route path="/forher" element={<ForHer />} />
          <Route path="/forhim" element={<ForHim />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
