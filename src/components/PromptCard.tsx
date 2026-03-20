import { Link } from 'react-router-dom';
import { Star, Download, Crown, Eye } from 'lucide-react';
import type { Prompt } from '../data/prompts';
import { CATEGORY_INFO, AI_MODEL_INFO } from '../data/prompts';
import { useCurrency } from '../context/CurrencyContext';
import './PromptCard.css';

interface PromptCardProps {
  prompt: Prompt;
  index?: number;
}

export default function PromptCard({ prompt, index = 0 }: PromptCardProps) {
  const categoryInfo = CATEGORY_INFO[prompt.category];
  const modelInfo = AI_MODEL_INFO[prompt.aiModel];
  const { formatPrice } = useCurrency();

  return (
    <Link
      to={`/prompt/${prompt.id}`}
      className={`prompt-card glass-card fade-in-up`}
      style={{ animationDelay: `${index * 0.08}s` }}
      id={`prompt-card-${prompt.id}`}
    >
      {/* Header with gradient bar */}
      <div className="prompt-card__header">
        <div
          className="prompt-card__gradient-bar"
          style={{
            background: `linear-gradient(135deg, ${categoryInfo.color} 0%, ${modelInfo.color} 100%)`,
          }}
        />
        <div className="prompt-card__meta">
          <span
            className="prompt-card__category"
            style={{ color: categoryInfo.color }}
          >
            {categoryInfo.emoji} {categoryInfo.label}
          </span>
          <span
            className="prompt-card__model"
            style={{ borderColor: `${modelInfo.color}44`, color: modelInfo.color }}
          >
            {modelInfo.label}
          </span>
        </div>
        {prompt.isPremium && (
          <div className="prompt-card__premium-badge">
            <Crown size={12} />
            Premium
          </div>
        )}
      </div>

      {/* Body */}
      <div className="prompt-card__body">
        <h3 className="prompt-card__title">{prompt.title}</h3>
        <p className="prompt-card__description">{prompt.description}</p>

        {/* Preview */}
        <div className="prompt-card__preview">
          <code>{prompt.previewText.substring(0, 80)}...</code>
        </div>

        {/* Tags */}
        <div className="prompt-card__tags">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="prompt-card__tag">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="prompt-card__footer">
        <div className="prompt-card__author">
          <img src={prompt.author.avatar} alt={prompt.author.name} className="prompt-card__avatar" />
          <span className="prompt-card__author-name">{prompt.author.name}</span>
          {prompt.author.verified && (
            <span className="prompt-card__verified" title="Verified Creator">✓</span>
          )}
        </div>
        <div className="prompt-card__stats">
          <span className="prompt-card__stat">
            <Star size={13} className="prompt-card__stat-icon prompt-card__stat-icon--star" />
            {prompt.rating}
          </span>
          <span className="prompt-card__stat">
            <Download size={13} />
            {prompt.downloads > 1000 ? `${(prompt.downloads / 1000).toFixed(1)}k` : prompt.downloads}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="prompt-card__price-row">
        {prompt.isFree ? (
          <span className="prompt-card__price prompt-card__price--free">Free</span>
        ) : (
          <span className="prompt-card__price">{formatPrice(prompt.price)}</span>
        )}
        <button className="prompt-card__cta" onClick={(e) => e.preventDefault()}>
          <Eye size={14} />
          View Details
        </button>
      </div>
    </Link>
  );
}
