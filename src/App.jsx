import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/Header";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LanguageContext from "./context/language";
import { useEffect, useState } from "react";

function App() {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem('app-language');
    return savedLang || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app-language', lang);
    
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    document.body.classList.remove("lang-ar", "lang-en");
    document.body.classList.add(`lang-${lang}`);
  }, [lang]);

  return (
    <div className="app-wrapper">
      <LanguageContext.Provider value={{ lang, setLang }}>
        <BrowserRouter>
          <Header />
          <div className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<ProductsList />} />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/product-details/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;


