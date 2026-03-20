import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import AdBanner from '../components/AdBanner';
import type { PromptCategory, AIModel } from '../data/prompts';
import { MOCK_PROMPTS, CATEGORY_INFO, AI_MODEL_INFO } from '../data/prompts';
import './Explore.css';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | 'all'>(
    (searchParams.get('category') as PromptCategory) || 'all'
  );
  const [selectedModel, setSelectedModel] = useState<AIModel | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid' | 'premium'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrompts = useMemo(() => {
    let result = [...MOCK_PROMPTS];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Model
    if (selectedModel !== 'all') {
      result = result.filter(p => p.aiModel === selectedModel);
    }

    // Price
    switch (priceFilter) {
      case 'free': result = result.filter(p => p.isFree); break;
      case 'paid': result = result.filter(p => !p.isFree); break;
      case 'premium': result = result.filter(p => p.isPremium); break;
    }

    // Sort
    switch (sortBy) {
      case 'popular': result.sort((a, b) => b.downloads - a.downloads); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [search, selectedCategory, selectedModel, priceFilter, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedModel('all');
    setPriceFilter('all');
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedModel !== 'all' || priceFilter !== 'all' || search !== '';

  return (
    <main className="explore" id="explore-page">
      <div className="explore__header">
        <div className="container">
          <h1 className="explore__title fade-in-up">Explore Prompts</h1>
          <p className="explore__subtitle fade-in-up fade-in-up--delay-1">
            Discover {MOCK_PROMPTS.length}+ prompts across {Object.keys(CATEGORY_INFO).length} categories
          </p>

          {/* Search Bar */}
          <div className="explore__search fade-in-up fade-in-up--delay-2" id="explore-search">
            <Search size={20} className="explore__search-icon" />
            <input
              type="text"
              className="explore__search-input"
              placeholder="Search prompts, tags, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="explore-search-input"
            />
            <button
              className="explore__filter-toggle btn btn--ghost"
              onClick={() => setShowFilters(!showFilters)}
              id="explore-filter-toggle"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container explore__content">
        {/* Filters Panel */}
        <div className={`explore__filters ${showFilters ? 'explore__filters--open' : ''}`} id="explore-filters">
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-chips">
              <button
                className={`filter-chip ${selectedCategory === 'all' ? 'filter-chip--active' : ''}`}
                onClick={() => { setSelectedCategory('all'); setSearchParams({}); }}
              >All</button>
              {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                <button
                  key={key}
                  className={`filter-chip ${selectedCategory === key ? 'filter-chip--active' : ''}`}
                  onClick={() => { setSelectedCategory(key as PromptCategory); setSearchParams({ category: key }); }}
                >
                  {info.emoji} {info.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">AI Model</label>
            <div className="filter-chips">
              <button
                className={`filter-chip ${selectedModel === 'all' ? 'filter-chip--active' : ''}`}
                onClick={() => setSelectedModel('all')}
              >All</button>
              {Object.entries(AI_MODEL_INFO).map(([key, info]) => (
                <button
                  key={key}
                  className={`filter-chip ${selectedModel === key ? 'filter-chip--active' : ''}`}
                  onClick={() => setSelectedModel(key as AIModel)}
                >
                  {info.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price</label>
            <div className="filter-chips">
              {(['all', 'free', 'paid', 'premium'] as const).map(f => (
                <button
                  key={f}
                  className={`filter-chip ${priceFilter === f ? 'filter-chip--active' : ''}`}
                  onClick={() => setPriceFilter(f)}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button className="explore__clear-filters btn btn--ghost" onClick={clearFilters}>
              <X size={14} /> Clear All Filters
            </button>
          )}
        </div>

        {/* Sort Bar */}
        <div className="explore__sort-bar">
          <span className="explore__results-count">
            {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} found
          </span>
          <div className="explore__sort">
            <label className="explore__sort-label">Sort by:</label>
            <select
              className="explore__sort-select input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              id="explore-sort-select"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Prompts Grid with inline ad */}
        <div className="prompts-grid">
          {filteredPrompts.map((prompt, i) => (
            <React.Fragment key={prompt.id}>
              <PromptCard prompt={prompt} index={i} />
              {/* Insert native ad after 4th item */}
              {i === 3 && (
                <div className="prompts-grid__ad-slot glass-card" style={{ display: 'flex', alignItems: 'center' }}>
                  <AdBanner type="sidebar" id="ad-sidebar-2" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="explore__empty">
            <p className="explore__empty-icon">🔍</p>
            <h3 className="explore__empty-title">No prompts found</h3>
            <p className="explore__empty-desc">Try adjusting your filters or search terms</p>
            <button className="btn btn--secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom ad banner */}
        <AdBanner type="banner" id="ad-banner-1" />
      </div>
    </main>
  );
}
