import { useState } from 'react';
import { Check, X, Sparkles, CreditCard, Shield } from 'lucide-react';
import { PRICING_PLANS } from '../data/prompts';
import { useCurrency } from '../context/CurrencyContext';
import { useUser } from '../context/UserContext';
import './Pricing.css';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const { formatPrice } = useCurrency();
  const { subscribePro, hasProPlan } = useUser();

  const getPrice = (price: number) => {
    if (price === 0) return 'Free';
    if (billingCycle === 'yearly') {
      const yearly = price * 10; // 2 months free
      return formatPrice(yearly);
    }
    return formatPrice(price);
  };

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') return;
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    if (window.confirm("Simulating subscription payment gateway (Stripe/PayPal).\n\nSince this is a static demo hosted on GitHub Pages, proceeding will simulate the payment and unlock all Pro features and prompts instantly.")) {
      subscribePro();
      setShowPaymentModal(false);
    }
  };

  return (
    <main className="pricing" id="pricing-page">
      <div className="pricing__header">
        <div className="container">
          <div className="pricing__badge badge badge--primary fade-in-up">
            <Sparkles size={12} />
            Simple Pricing
          </div>
          <h1 className="pricing__title fade-in-up fade-in-up--delay-1">
            Choose Your Plan
          </h1>
          <p className="pricing__subtitle fade-in-up fade-in-up--delay-2">
            Start free and upgrade as you grow. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="pricing__toggle fade-in-up fade-in-up--delay-3" id="billing-toggle">
            <button
              className={`pricing__toggle-btn ${billingCycle === 'monthly' ? 'pricing__toggle-btn--active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`pricing__toggle-btn ${billingCycle === 'yearly' ? 'pricing__toggle-btn--active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <span className="pricing__save-badge">Save 17%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="pricing__grid fade-in-up fade-in-up--delay-4">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card glass-card ${plan.popular ? 'pricing-card--popular' : ''}`}
              id={`pricing-card-${plan.id}`}
            >
              {plan.popular && (
                <div className="pricing-card__popular-tag">Most Popular</div>
              )}
              <div className="pricing-card__header">
                <h3 className="pricing-card__name">{plan.name}</h3>
                <div className="pricing-card__price-wrap">
                  <span className="pricing-card__price">{getPrice(plan.price)}</span>
                  {plan.period && (
                    <span className="pricing-card__period">
                      {billingCycle === 'yearly' ? '/year' : plan.period}
                    </span>
                  )}
                </div>
                <p className="pricing-card__desc">{plan.description}</p>
              </div>

              <div className="pricing-card__features">
                {plan.features.map((feature) => (
                  <div key={feature} className="pricing-card__feature">
                    <Check size={16} className="pricing-card__feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation) => (
                  <div key={limitation} className="pricing-card__feature pricing-card__feature--limited">
                    <X size={16} className="pricing-card__feature-icon--limited" />
                    <span>{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                className={`pricing-card__cta btn ${plan.popular ? 'btn--primary' : 'btn--secondary'} btn--lg`}
                onClick={() => handleSelectPlan(plan.id)}
                id={`pricing-cta-${plan.id}`}
                disabled={plan.id !== 'free' && hasProPlan}
              >
                {plan.id !== 'free' && hasProPlan ? "Current Plan" : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="pricing__trust fade-in-up">
          <div className="pricing__trust-item">
            <Shield size={20} />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="pricing__trust-item">
            <CreditCard size={20} />
            <span>Secure payment via Stripe & PayPal</span>
          </div>
          <div className="pricing__trust-item">
            <Sparkles size={20} />
            <span>Cancel anytime, no questions asked</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pricing__payment-methods fade-in-up">
          <p className="pricing__payment-label">Accepted payment methods</p>
          <div className="pricing__payment-icons">
            <div className="payment-icon">💳 Visa</div>
            <div className="payment-icon">💳 Mastercard</div>
            <div className="payment-icon">🅿️ PayPal</div>
            <div className="payment-icon">🍎 Apple Pay</div>
            <div className="payment-icon">G Google Pay</div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal" id="payment-modal" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal__content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="payment-modal__close" onClick={() => setShowPaymentModal(false)}>
              <X size={20} />
            </button>
            <h2 className="payment-modal__title">Complete Your Purchase</h2>
            <p className="payment-modal__plan">
              {selectedPlan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'} — {billingCycle === 'yearly' ? 'Annual' : 'Monthly'} Billing
            </p>

            <div className="payment-modal__methods">
              <button className="payment-method" id="pay-stripe" onClick={handlePayment}>
                <CreditCard size={20} />
                <div>
                  <strong>Credit / Debit Card</strong>
                  <span>Powered by Stripe</span>
                </div>
              </button>
              <button className="payment-method" id="pay-paypal" onClick={handlePayment}>
                <span className="payment-method__icon">🅿️</span>
                <div>
                  <strong>PayPal</strong>
                  <span>Quick and secure checkout</span>
                </div>
              </button>
              <button className="payment-method" id="pay-apple" onClick={handlePayment}>
                <span className="payment-method__icon">🍎</span>
                <div>
                  <strong>Apple Pay</strong>
                  <span>One-tap payment</span>
                </div>
              </button>
            </div>

            <p className="payment-modal__note">
              <Shield size={14} />
              Your payment information is encrypted and secure. Cancel anytime.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
