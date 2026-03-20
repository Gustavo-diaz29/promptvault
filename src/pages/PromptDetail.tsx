import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Download, Crown, Copy, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { MOCK_PROMPTS, CATEGORY_INFO, AI_MODEL_INFO } from '../data/prompts';
import { useUser } from '../context/UserContext';
import { useCurrency } from '../context/CurrencyContext';
import AdBanner from '../components/AdBanner';
import PromptCard from '../components/PromptCard';
import './PromptDetail.css';

export default function PromptDetail() {
  const { id } = useParams();
  const prompt = MOCK_PROMPTS.find(p => p.id === id);
  const [copied, setCopied] = useState(false);
  const { addToCart, isOwned, isInCart } = useUser();
  const { formatPrice } = useCurrency();

  if (!prompt) {
    return (
      <main className="prompt-detail container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Prompt not found</h2>
        <Link to="/explore" className="btn btn--primary" style={{ marginTop: '1rem' }}>
          Back to Explore
        </Link>
      </main>
    );
  }

  const categoryInfo = CATEGORY_INFO[prompt.category];
  const modelInfo = AI_MODEL_INFO[prompt.aiModel];
  const relatedPrompts = MOCK_PROMPTS.filter(p => p.category === prompt.category && p.id !== prompt.id).slice(0, 3);

  const handleCopy = () => {
    const textToCopy = (prompt.isFree || (prompt.id && isOwned(prompt.id))) ? prompt.fullPrompt : prompt.previewText;
    navigator.clipboard.writeText(textToCopy || prompt.previewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="prompt-detail" id="prompt-detail-page">
      <div className="prompt-detail__header">
        <div className="container">
          <Link to="/explore" className="prompt-detail__back btn btn--ghost fade-in-up">
            <ArrowLeft size={18} />
            Back to Explore
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="prompt-detail__layout">
          {/* Main Content */}
          <div className="prompt-detail__main fade-in-up">
            <div className="prompt-detail__badges">
              <span className="badge badge--primary" style={{ color: categoryInfo.color }}>
                {categoryInfo.emoji} {categoryInfo.label}
              </span>
              <span className="badge" style={{ borderColor: `${modelInfo.color}44`, color: modelInfo.color, border: '1px solid' }}>
                {modelInfo.label}
              </span>
              {prompt.isPremium && (
                <span className="badge badge--premium">
                  <Crown size={12} />
                  Premium
                </span>
              )}
            </div>

            <h1 className="prompt-detail__title">{prompt.title}</h1>

            <div className="prompt-detail__meta">
              <div className="prompt-detail__author">
                <img src={prompt.author.avatar} alt={prompt.author.name} className="prompt-detail__avatar" />
                <span className="prompt-detail__author-name">
                  {prompt.author.name}
                  {prompt.author.verified && <span className="prompt-detail__verified">✓</span>}
                </span>
              </div>
              <div className="prompt-detail__stats">
                <span className="prompt-detail__stat">
                  <Star size={16} className="prompt-detail__star" />
                  {prompt.rating} ({prompt.reviewCount} reviews)
                </span>
                <span className="prompt-detail__stat">
                  <Download size={16} />
                  {prompt.downloads.toLocaleString()} downloads
                </span>
              </div>
            </div>

            <p className="prompt-detail__description">{prompt.description}</p>

            {/* Prompt Preview */}
            <div className="prompt-detail__prompt-box glass-card">
              <div className="prompt-detail__prompt-header">
                <h3>Prompt Preview</h3>
                <button className="btn btn--ghost btn--sm" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="prompt-detail__prompt-text">
                <code>{(prompt.isFree || isOwned(prompt.id)) ? prompt.fullPrompt : prompt.previewText}</code>
              </pre>
              {(!prompt.isFree && !isOwned(prompt.id)) && (
                <div className="prompt-detail__prompt-overlay">
                  <p>🔒 Purchase to see the full prompt</p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="prompt-detail__tags">
              {prompt.tags.map(tag => (
                <Link key={tag} to={`/explore?q=${tag}`} className="prompt-detail__tag">
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="prompt-detail__reviews glass-card">
              <h3 className="prompt-detail__reviews-title">User Reviews</h3>
              <div className="prompt-detail__review">
                <div className="prompt-detail__review-header">
                  <strong>JohnDev</strong>
                  <div className="prompt-detail__review-stars">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} className={s <= 5 ? 'star-filled' : ''} />
                    ))}
                  </div>
                </div>
                <p>"Excellent prompt! Saved me hours of work. The output quality is consistently impressive."</p>
              </div>
              <div className="prompt-detail__review">
                <div className="prompt-detail__review-header">
                  <strong>CreativeAI</strong>
                  <div className="prompt-detail__review-stars">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} className={s <= 4 ? 'star-filled' : ''} />
                    ))}
                  </div>
                </div>
                <p>"Very well structured. The results are much better than what I was getting with my own prompts."</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="prompt-detail__sidebar fade-in-up fade-in-up--delay-2">
            <div className="prompt-detail__purchase glass-card">
              <div className="prompt-detail__price-wrap">
                {prompt.isFree ? (
                  <span className="prompt-detail__price prompt-detail__price--free">Free</span>
                ) : (
                  <span className="prompt-detail__price">{formatPrice(prompt.price)}</span>
                )}
              </div>

              <button 
                className={`btn btn--lg prompt-detail__buy-btn ${isOwned(prompt.id) || isInCart(prompt.id) ? 'btn--secondary' : 'btn--primary'}`}
                id="buy-prompt-btn"
                onClick={() => {
                  if (prompt.isFree || isOwned(prompt.id)) {
                    handleCopy();
                  } else if (isInCart(prompt.id)) {
                    alert("Already in cart! Proceed to checkout in the navbar.");
                  } else {
                    addToCart(prompt.id);
                  }
                }}
              >
                {prompt.isFree || isOwned(prompt.id) ? (
                  <>
                    <Download size={18} />
                    Download / Copy
                  </>
                ) : isInCart(prompt.id) ? (
                  <>
                    <ShoppingCart size={18} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Buy Now
                  </>
                )}
              </button>

              <div className="prompt-detail__actions">
                <button className="btn btn--secondary">
                  <Heart size={16} />
                  Wishlist
                </button>
                <button className="btn btn--secondary">
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              <div className="prompt-detail__info-list">
                <div className="prompt-detail__info-item">
                  <span>AI Model</span>
                  <span style={{ color: modelInfo.color }}>{modelInfo.label}</span>
                </div>
                <div className="prompt-detail__info-item">
                  <span>Category</span>
                  <span>{categoryInfo.label}</span>
                </div>
                <div className="prompt-detail__info-item">
                  <span>Added</span>
                  <span>{new Date(prompt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="prompt-detail__info-item">
                  <span>Downloads</span>
                  <span>{prompt.downloads.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <AdBanner type="sidebar" id="ad-sidebar-1" />
          </aside>
        </div>

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <section className="prompt-detail__related section">
            <h2 className="section-title">Related Prompts</h2>
            <div className="prompts-grid" style={{ marginTop: 'var(--space-xl)' }}>
              {relatedPrompts.map((p, i) => (
                <PromptCard key={p.id} prompt={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
