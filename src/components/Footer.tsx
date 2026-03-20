import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <Sparkles size={20} className="footer__logo-icon" />
              <span>Prompt<span className="footer__logo-accent">Vault</span></span>
            </Link>
            <p className="footer__description">
              The #1 marketplace for AI prompts. Discover, create, and sell high-quality
              prompts for ChatGPT, Midjourney, Stable Diffusion, and more.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="GitHub"><Github size={18} /></a>
              <a href="#" className="footer__social" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="footer__social" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Marketplace</h4>
            <ul className="footer__list">
              <li><Link to="/explore" className="footer__item">Explore Prompts</Link></li>
              <li><Link to="/explore" className="footer__item">Categories</Link></li>
              <li><Link to="/explore" className="footer__item">Trending</Link></li>
              <li><Link to="/explore" className="footer__item">New Releases</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Creators</h4>
            <ul className="footer__list">
              <li><Link to="/sell" className="footer__item">Sell Prompts</Link></li>
              <li><Link to="/sell" className="footer__item">Creator Dashboard</Link></li>
              <li><Link to="/sell" className="footer__item">Analytics</Link></li>
              <li><Link to="/sell" className="footer__item">Payouts</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__list">
              <li><Link to="/" className="footer__item">About Us</Link></li>
              <li><Link to="/pricing" className="footer__item">Pricing</Link></li>
              <li><Link to="/" className="footer__item">Privacy Policy</Link></li>
              <li><Link to="/" className="footer__item">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 PromptVault. All rights reserved.
          </p>
          <p className="footer__note">
            Built with ❤️ for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
}
