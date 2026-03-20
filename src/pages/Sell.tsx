import { Link } from 'react-router-dom';
import { DollarSign, BarChart3, Users, Rocket, ArrowRight, CheckCircle } from 'lucide-react';
import './Sell.css';

export default function Sell() {
  const benefits = [
    {
      icon: <DollarSign size={28} />,
      title: 'Earn Up to 80%',
      desc: 'Keep the majority of every sale. Industry-leading commission rates for prompt creators.',
      color: '#10b981',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Detailed Analytics',
      desc: 'Track views, sales, downloads, and revenue in real-time with our creator dashboard.',
      color: '#06b6d4',
    },
    {
      icon: <Users size={28} />,
      title: 'Built-in Audience',
      desc: 'Reach 200,000+ AI enthusiasts and professionals actively looking for quality prompts.',
      color: '#7c3aed',
    },
    {
      icon: <Rocket size={28} />,
      title: 'Fast Payouts',
      desc: 'Get paid weekly via PayPal or bank transfer. No minimum balance required.',
      color: '#f59e0b',
    },
  ];

  const steps = [
    { num: '01', title: 'Create Your Prompt', desc: 'Write and test your prompt to ensure high-quality, consistent outputs.' },
    { num: '02', title: 'Upload & Set Pricing', desc: 'Upload your prompt, add tags, set your price, and write a compelling description.' },
    { num: '03', title: 'Get Discovered', desc: 'Our algorithm promotes quality prompts to the right buyers automatically.' },
    { num: '04', title: 'Earn Money', desc: 'Get paid for every sale. Watch your passive income grow as downloads increase.' },
  ];

  return (
    <main className="sell" id="sell-page">
      {/* Hero */}
      <section className="sell__hero">
        <div className="container">
          <h1 className="sell__title fade-in-up">
            Turn Your AI Expertise Into
            <span className="sell__title-gradient"> Revenue</span>
          </h1>
          <p className="sell__subtitle fade-in-up fade-in-up--delay-1">
            Join 12,000+ creators earning money by selling high-quality AI prompts. 
            Set your own prices, keep up to 80% of each sale.
          </p>
          <div className="sell__hero-actions fade-in-up fade-in-up--delay-2">
            <button className="btn btn--primary btn--lg" id="sell-cta-start" onClick={() => alert("Creator Dashboard registration is coming soon! Thank you for your interest.")}>
              Start Selling Today
              <ArrowRight size={18} />
            </button>
            <Link to="/explore" className="btn btn--secondary btn--lg">
              Browse Examples
            </Link>
          </div>
          
          <div className="sell__hero-stats fade-in-up fade-in-up--delay-3">
            <div className="sell__hero-stat">
              <span className="sell__hero-stat-value">$2.4M+</span>
              <span className="sell__hero-stat-label">Paid to creators</span>
            </div>
            <div className="sell__hero-stat">
              <span className="sell__hero-stat-value">12K+</span>
              <span className="sell__hero-stat-label">Active creators</span>
            </div>
            <div className="sell__hero-stat">
              <span className="sell__hero-stat-value">80%</span>
              <span className="sell__hero-stat-label">Revenue share</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="section-header fade-in-up" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <h2 className="section-title">Why Sell on PromptVault?</h2>
              <p className="section-subtitle">Everything you need to build a successful prompt business</p>
            </div>
          </div>
          <div className="sell__benefits fade-in-up fade-in-up--delay-1">
            {benefits.map((b) => (
              <div key={b.title} className="sell__benefit glass-card">
                <div className="sell__benefit-icon" style={{ background: `${b.color}15`, color: b.color }}>
                  {b.icon}
                </div>
                <h3 className="sell__benefit-title">{b.title}</h3>
                <p className="sell__benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section sell__how-section">
        <div className="container">
          <div className="section-header fade-in-up" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">Start earning in 4 simple steps</p>
            </div>
          </div>
          <div className="sell__steps fade-in-up fade-in-up--delay-1">
            {steps.map((step) => (
              <div key={step.num} className="sell__step">
                <div className="sell__step-num">{step.num}</div>
                <h3 className="sell__step-title">{step.title}</h3>
                <p className="sell__step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section">
        <div className="container">
          <div className="sell__requirements glass-card fade-in-up">
            <h3 className="sell__req-title">Creator Requirements</h3>
            <div className="sell__req-list">
              <div className="sell__req-item">
                <CheckCircle size={18} className="sell__req-icon" />
                <span>Original, high-quality prompts with consistent results</span>
              </div>
              <div className="sell__req-item">
                <CheckCircle size={18} className="sell__req-icon" />
                <span>Clear descriptions with use cases and examples</span>
              </div>
              <div className="sell__req-item">
                <CheckCircle size={18} className="sell__req-icon" />
                <span>Prompts must be tested on the specified AI model</span>
              </div>
              <div className="sell__req-item">
                <CheckCircle size={18} className="sell__req-icon" />
                <span>No copied or plagiarized content from other sources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sell__bottom-cta section">
        <div className="container">
          <div className="cta-card fade-in-up">
            <h2 className="cta-card__title">Ready to Start Earning?</h2>
            <p className="cta-card__desc">
              Join thousands of creators already making money on PromptVault. No upfront costs.
            </p>
            <div className="cta-card__actions">
              <button className="btn btn--primary btn--lg" id="sell-cta-bottom" onClick={() => alert("Creator Dashboard registration is coming soon! Thank you for your interest.")}>
                Create Creator Account
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
