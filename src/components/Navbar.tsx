import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useCurrency } from '../context/CurrencyContext';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cart, checkout, hasProPlan } = useUser();
  const { currency, setCurrencyCode } = useCurrency();

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (window.confirm(`Simulating Payment Gateway: Proceed to checkout ${cart.length} item(s)?\n\n(Since this is hosted on GitHub Pages, this simulates a real purchase and will unlock the item)`)) {
      checkout();
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container container">
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <Sparkles className="navbar__logo-icon" size={24} />
          <span className="navbar__logo-text">Prompt<span className="navbar__logo-accent">Vault</span></span>
        </Link>

        <div className="navbar__search" id="navbar-search">
          <Search size={16} className="navbar__search-icon" />
          <input 
            type="text" 
            placeholder="Search prompts..." 
            className="navbar__search-input"
            id="navbar-search-input"
          />
        </div>

        <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/" className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`} id="nav-home">
            Home
          </Link>
          <Link to="/explore" className={`navbar__link ${location.pathname === '/explore' ? 'navbar__link--active' : ''}`} id="nav-explore">
            Explore
          </Link>
          <Link to="/pricing" className={`navbar__link ${location.pathname === '/pricing' ? 'navbar__link--active' : ''}`} id="nav-pricing">
            Pricing
          </Link>
          <Link to="/sell" className={`navbar__link ${location.pathname === '/sell' ? 'navbar__link--active' : ''}`} id="nav-sell">
            Sell Prompts
          </Link>
        </div>

        <div className="navbar__actions">
          {/* Custom Currency Dropdown */}
          <div className="navbar__currency" style={{ position: 'relative' }}>
            <button 
              className="navbar__currency-btn"
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              onBlur={() => setTimeout(() => setShowCurrencyDropdown(false), 200)}
            >
              {currency.code === 'USD' && '🇺🇸 USD'}
              {currency.code === 'EUR' && '🇪🇺 EUR'}
              {currency.code === 'GBP' && '🇬🇧 GBP'}
              {currency.code === 'MXN' && '🇲🇽 MXN'}
              {currency.code === 'COP' && '🇨🇴 COP'}
              <ChevronDown size={14} style={{ marginLeft: 4, opacity: 0.7 }} />
            </button>
            {showCurrencyDropdown && (
              <div className="navbar__currency-dropdown glass-card">
                {(['USD', 'EUR', 'GBP', 'MXN', 'COP'] as const).map(code => (
                  <button 
                    key={code}
                    className={`navbar__currency-option ${currency.code === code ? 'active' : ''}`}
                    onClick={() => { setCurrencyCode(code); setShowCurrencyDropdown(false); }}
                  >
                    {code === 'USD' && '🇺🇸 USD'}
                    {code === 'EUR' && '🇪🇺 EUR'}
                    {code === 'GBP' && '🇬🇧 GBP'}
                    {code === 'MXN' && '🇲🇽 MXN'}
                    {code === 'COP' && '🇨🇴 COP'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="navbar__cart" id="navbar-cart" onClick={handleCheckoutClick}>
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="navbar__cart-badge">{cart.length}</span>}
          </button>
          {!hasProPlan && (
            <Link to="/pricing" className="btn btn--primary btn--sm" id="navbar-cta">
              Go Pro
            </Link>
          )}
          <button 
            className="navbar__toggle" 
            onClick={() => setIsOpen(!isOpen)}
            id="navbar-toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
