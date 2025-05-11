import React, { useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faLanguage, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../context/language";

export default function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  
  const cart = useSelector((state) =>
    (state.cart.cartItems || []).reduce(
      (sum, product) => sum + product.quantity,
      0
    )
  );
  
  const { t, changeLanguage, currentLang } = useTranslation();

  const handleLangChange = (e) => {
    changeLanguage(e.target.value);
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <span className="brand-text">{t('appName')}</span>
        </NavLink>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded={!isNavCollapsed ? true : false} 
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {t('home')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                {t('products')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                {t('register')}
              </NavLink>
            </li>
          </ul>
          
          <form className="d-flex mx-auto search-form">
            <div className="input-group">
              <input 
                className="form-control" 
                type="search" 
                placeholder={t('search')} 
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link position-relative" to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                {cart > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart}
                  </span>
                )}
              </NavLink>
            </li>
            
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="languageDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faLanguage} className="me-1" />
                {currentLang === 'en' ? 'English' : 'العربية'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                <li>
                  <button 
                    className={`dropdown-item ${currentLang === 'en' ? 'active' : ''}`} 
                    onClick={() => changeLanguage('en')}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${currentLang === 'ar' ? 'active' : ''}`} 
                    onClick={() => changeLanguage('ar')}
                  >
                    العربية
                  </button>
                </li>
              </ul>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


