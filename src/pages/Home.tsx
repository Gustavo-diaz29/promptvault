import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, TrendingUp, Users, Sparkles, ChevronRight } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import AdBanner from '../components/AdBanner';
import type { PromptCategory } from '../data/prompts';
import { MOCK_PROMPTS, CATEGORY_INFO } from '../data/prompts';
import './Home.css';

export default function Home() {
  const featuredPrompts = MOCK_PROMPTS.filter(p => p.featured).slice(0, 4);
  const trendingPrompts = MOCK_PROMPTS.sort((a, b) => b.downloads - a.downloads).slice(0, 4);
  const categories = Object.entries(CATEGORY_INFO) as [PromptCategory, typeof CATEGORY_INFO[PromptCategory]][];

  const stats = [
    { value: '50K+', label: 'Prompts', icon: '📝' },
    { value: '12K+', label: 'Creators', icon: '👥' },
    { value: '200K+', label: 'Downloads', icon: '📥' },
    { value: '4.8★', label: 'Avg Rating', icon: '⭐' },
  ];

  return (
    <main className="home" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__bg">
          <div className="hero__grid-overlay" />
        </div>
        <div className="container hero__container">
          <div className="hero__content fade-in-up">
            <div className="hero__badge badge badge--primary">
              <Sparkles size={12} />
              #1 AI Prompt Marketplace
            </div>
            <h1 className="hero__title">
              Discover the Best
              <span className="hero__title-gradient"> AI Prompts </span>
              That Actually Work
            </h1>
            <p className="hero__subtitle">
              Browse 50,000+ tested prompts for ChatGPT, Midjourney, Stable Diffusion, DALL·E, and more.
              Save hours of experimentation and get professional results instantly.
            </p>
            <div className="hero__actions">
              <Link to="/explore" className="btn btn--primary btn--lg" id="hero-cta-explore">
                Explore Prompts
                <ArrowRight size={18} />
              </Link>
              <Link to="/sell" className="btn btn--secondary btn--lg" id="hero-cta-sell">
                Start Selling
              </Link>
            </div>
          </div>

          <div className="hero__stats fade-in-up fade-in-up--delay-2">
            {stats.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-icon">{stat.icon}</span>
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories-section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find the perfect prompt for your use case</p>
          </div>
          <div className="categories-grid fade-in-up fade-in-up--delay-1">
            {categories.map(([key, info]) => (
              <Link
                to={`/explore?category=${key}`}
                key={key}
                className="category-card glass-card"
                id={`category-${key}`}
              >
                <span className="category-card__emoji">{info.emoji}</span>
                <span className="category-card__label">{info.label}</span>
                <ChevronRight size={16} className="category-card__arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="section" id="featured-section">
        <div className="container">
          <div className="section-header fade-in-up">
            <div>
              <h2 className="section-title">⭐ Featured Prompts</h2>
              <p className="section-subtitle">Hand-picked by our team for exceptional quality</p>
            </div>
            <Link to="/explore" className="btn btn--ghost">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="prompts-grid">
            {featuredPrompts.map((prompt, i) => (
              <PromptCard key={prompt.id} prompt={prompt} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Non-invasive ad banner */}
      <div className="container">
        <AdBanner type="banner" id="ad-banner-1" />
      </div>

      {/* Trending */}
      <section className="section" id="trending-section">
        <div className="container">
          <div className="section-header fade-in-up">
            <div>
              <h2 className="section-title">🔥 Trending Now</h2>
              <p className="section-subtitle">Most downloaded prompts this week</p>
            </div>
            <Link to="/explore" className="btn btn--ghost">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="prompts-grid">
            {trendingPrompts.map((prompt, i) => (
              <PromptCard key={prompt.id} prompt={prompt} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why PromptVault */}
      <section className="section why-section" id="why-section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">Why PromptVault?</h2>
            <p className="section-subtitle">Built for creators and professionals who demand the best</p>
          </div>
          <div className="why-grid fade-in-up fade-in-up--delay-1">
            <div className="why-card glass-card">
              <div className="why-card__icon-wrap" style={{ background: 'rgba(124, 58, 237, 0.1)' }}>
                <Zap size={24} color="#7c3aed" />
              </div>
              <h3 className="why-card__title">Tested & Optimized</h3>
              <p className="why-card__desc">Every prompt is tested for quality and optimized for best results across different AI models.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-card__icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <Shield size={24} color="#10b981" />
              </div>
              <h3 className="why-card__title">Secure Payments</h3>
              <p className="why-card__desc">Buy and sell with confidence through Stripe and PayPal integration with buyer protection.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-card__icon-wrap" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
                <TrendingUp size={24} color="#06b6d4" />
              </div>
              <h3 className="why-card__title">Earn as a Creator</h3>
              <p className="why-card__desc">Set your own prices and earn up to 80% commission on every sale of your prompts.</p>
            </div>
            <div className="why-card glass-card">
              <div className="why-card__icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                <Users size={24} color="#f59e0b" />
              </div>
              <h3 className="why-card__title">Active Community</h3>
              <p className="why-card__desc">Join 12,000+ creators and professionals sharing knowledge and best practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-section">
        <div className="container">
          <div className="cta-card fade-in-up">
            <h2 className="cta-card__title">Ready to Level Up Your AI Game?</h2>
            <p className="cta-card__desc">
              Join thousands of professionals using PromptVault to save time and get better results.
            </p>
            <div className="cta-card__actions">
              <Link to="/explore" className="btn btn--primary btn--lg">
                Browse Prompts <ArrowRight size={18} />
              </Link>
              <Link to="/pricing" className="btn btn--secondary btn--lg">
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
