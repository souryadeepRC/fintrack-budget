'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function FintrackLanding() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className='fintrack-root'>
      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className='nav'>
        <div className='nav-inner'>
          <a href='#' className='nav-logo'>
            <span className='logo-icon'>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path d='M10 2L3 7v6l7 5 7-5V7L10 2z' fill='url(#logoGrad)' />
                <defs>
                  <linearGradient id='logoGrad' x1='3' y1='2' x2='17' y2='18' gradientUnits='userSpaceOnUse'>
                    <stop stopColor='#2EC4A0' />
                    <stop offset='1' stopColor='#0EA5C9' />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            Fintrack
          </a>
          <div className='nav-links'>
            <a href='#features'>Features</a>
            <a href='#aiChat'>Chat with AI</a>
            <a href='#pricing'>Pricing</a>
            <a href='#blog'>Blog</a>
            <a href='#faq'>FAQ</a>
          </div>
          <div className='nav-actions'>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className='hero' ref={heroRef}>
        {/* Background mesh */}
        <div className='hero-mesh' aria-hidden />

        <div className='hero-inner'>
          {/* Left column */}
          <div className={`hero-copy ${mounted ? 'visible' : ''}`}>
            {/* Badge */}
            <div className='badge'>
              <span className='badge-dot' />
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z'/>
                <path d='M19 10v2a7 7 0 0 1-14 0v-2'/>
                <line x1='12' y1='19' x2='12' y2='22'/>
              </svg>
              New AI Feature: Voice Speech Update
            </div>

            {/* Headline */}
            <h1 className='headline'>
              Fintrack Budget:<br />
              Smart Money{' '}
              <span className='headline-accent'>Intelligence</span>
            </h1>

            <p className='hero-body'>
              Master your money with intelligent tracking and budgeting. Fintrack Budget combines
              AI&#8209;driven insights with intuitive design to help you achieve financial freedom.
            </p>

            {/* CTA row */}
            <div className='hero-actions'>
              <a href='/auth/register' className='btn-primary'>
                Sign up for free
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M5 12h14M12 5l7 7-7 7'/>
                </svg>
              </a>
              <a href='/auth/login' className='btn-ghost'>
                Already a user? Login
              </a>
            </div>

            {/* Trust row */}
            <div className='trust-row'>
              <div className='trust-avatars'>
                {['#2EC4A0','#0EA5C9','#6366F1','#F59E0B'].map((c, i) => (
                  <div key={i} className='trust-avatar' style={{ background: c, zIndex: 4 - i }} />
                ))}
              </div>
              <span className='trust-text'>
                <strong>50,000+</strong> users trust Fintrack
              </span>
            </div>
          </div>

          {/* Right column — 3‑D shield illustration */}
          <div className={`hero-visual ${mounted ? 'visible' : ''}`}>
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────── */}
      <div className='stats-bar'>
        <div className='stats-inner'>
          {[
            { value: '$2.4B', label: 'Money tracked' },
            { value: '50K+', label: 'Active users' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '4.9★', label: 'App store rating' },
          ].map((s) => (
            <div key={s.label} className='stat-item'>
              <span className='stat-value'>{s.value}</span>
              <span className='stat-label'>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section id="features" className='features'>
        <div className='features-inner'>
          <div className='section-head'>
            <div className='section-eyebrow'>Intelligent Features</div>
            <h2 className='section-title'>Advanced AI-powered tools designed<br />for modern financial management</h2>
          </div>

          <div className='feat-grid'>
            <FeatureCard
              icon={<MicIcon />}
              color='teal'
              title='Voice Speech Update'
              desc='Control finances and get insights using voice commands. Hands-free finance management, powered by on-device AI.'
              tag='NEW'
              highlight
            />
            <FeatureCard
              icon={<ChartIcon />}
              color='cyan'
              title='Expense Analysis'
              desc='Automatically categorize transactions and visualize your spending patterns with detailed, real-time reports.'
            />
            <FeatureCard
              icon={<TargetIcon />}
              color='blue'
              title='Financial Goals'
              desc='Create savings goals and track your progress with personalized recommendations and dynamic timelines.'
            />
            <FeatureCard
              icon={<LockIcon />}
              color='indigo'
              title='Secure Insights'
              desc='Your financial data is protected with bank-level encryption and advanced security protocols, always.'
            />
          </div>
        </div>
      </section>

      {/* ── AI SHOWCASE ─────────────────────────────────── */}
      <section className='ai-section'>
        <div className='ai-inner'>
          <div className='ai-visual'>
            <AiDashboardMockup />
          </div>
          <div className='ai-copy'>
            <div className='section-eyebrow'>AI at the core</div>
            <h2 className='section-title left'>Your money, understood in real time</h2>
            <p className='ai-body'>
              Our proprietary AI engine analyses every transaction the moment it lands, clusters
              spending into smart categories, and surfaces anomalies before they become problems.
            </p>
            <ul className='ai-list'>
              {[
                'Predictive cash-flow forecasting up to 90 days',
                'Smart subscription detection & cancel reminders',
                'Personalised saving nudges based on your patterns',
              ].map((item) => (
                <li key={item}>
                  <span className='ai-check'>
                    <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
                      <path d='M2 6l3 3 5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href='#features' className='btn-primary'>
              Explore AI features
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M5 12h14M12 5l7 7-7 7'/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── AI CHAT SHOWCASE ────────────────────────────── */}
      <section id="aiChat" className='chat-feature-section'>
        <div className='chat-feature-inner'>
          <div className='chat-feature-copy'>
            <div className='section-eyebrow'>Conversational Interface</div>
            <h2 className='section-title left'>Chat with your finances</h2>
            <p className='chat-feature-body'>
              Meet Fintract AI, your personal financial assistant. Just type or speak naturally to log expenses, check balances, or get smart insights on your spending habits. No more manual entry forms.
            </p>
            <ul className='ai-list'>
              <li><span className='ai-check'><CheckIcon /></span> Natural language expense logging</li>
              <li><span className='ai-check'><CheckIcon /></span> Instant category assignments</li>
              <li><span className='ai-check'><CheckIcon /></span> Real-time budget queries</li>
            </ul>
          </div>
          <div className='chat-feature-visual'>
            <AiChatMockup />
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      <section id="pricing" className='pricing-section'>
        <div className='pricing-inner'>
          <div className='section-head'>
            <div className='section-eyebrow'>Pricing</div>
            <h2 className='section-title'>Simple, transparent plans for<br />every financial journey</h2>
          </div>

          <div className='pricing-grid'>
            {/* Free Tier */}
            <div className='pricing-card'>
              <h3 className='plan-name'>Free</h3>
              <div className='plan-price'>₹0<span>/month</span></div>
              <ul className='plan-features'>
                <li><span className='plan-check'><CheckIcon /></span>Basic expense tracking</li>
                <li><span className='plan-check'><CheckIcon /></span>Up to 50 transactions/month</li>
                <li><span className='plan-check'><CheckIcon /></span>Simple debt management</li>
                <li><span className='plan-check'><CheckIcon /></span>Standard email support</li>
              </ul>
              <a href='/auth/register' className='btn-ghost w-full justify-center'>Get Started</a>
            </div>

            {/* Pro Tier */}
            <div className='pricing-card popular'>
              <div className='popular-badge'>Most Popular</div>
              <h3 className='plan-name'>Pro</h3>
              <div className='plan-price'>₹199<span>/month</span></div>
              <ul className='plan-features'>
                <li><span className='plan-check'><CheckIcon /></span>Unlimited transactions</li>
                <li><span className='plan-check'><CheckIcon /></span>AI-powered categorisation</li>
                <li><span className='plan-check'><CheckIcon /></span>Advanced debt settlements</li>
                <li><span className='plan-check'><CheckIcon /></span>Detailed analytics & reports</li>
              </ul>
              <a href='/auth/register' className='btn-primary w-full justify-center'>Go Pro</a>
            </div>

            {/* Elite Tier */}
            <div className='pricing-card'>
              <h3 className='plan-name'>Elite</h3>
              <div className='plan-price'>₹599<span>/month</span></div>
              <ul className='plan-features'>
                <li><span className='plan-check'><CheckIcon /></span>Everything in Pro</li>
                <li><span className='plan-check'><CheckIcon /></span>Voice Speech updates</li>
                <li><span className='plan-check'><CheckIcon /></span>Predictive cash-flow (90 days)</li>
                <li><span className='plan-check'><CheckIcon /></span>Priority 24/7 support</li>
              </ul>
              <a href='/auth/register' className='btn-ghost w-full justify-center'>Go Elite</a>
            </div>
          </div>
        </div>
      </section>


      {/* ── BLOG & TESTIMONIALS ─────────────────────────── */}
      <section id="blog" className='testi-section'>
        <div className='testi-inner'>
          <div className='section-head'>
            <div className='section-eyebrow'>Community Voices</div>
            <h2 className='section-title'>See what our users are<br />saying about Fintrack</h2>
          </div>

          <div className='testi-grid'>
            {/* Testimonial 1 */}
            <div className='testi-card'>
              <div className='stars'>
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className='testi-comment'>
                "The new voice update feature is a game-changer. I literally just tell my phone I bought a coffee and Fintrack logs it instantly!"
              </p>
              <div className='testi-author'>
                <div className='testi-avatar'>AS</div>
                <div className='testi-author-info'>
                  <h4>Souryadeep Roy Chowdhury</h4>
                  <p>Product Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className='testi-card'>
              <div className='stars'>
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className='testi-comment'>
                "Managing shared expenses with my roommates used to be a nightmare. The debt tracking and net position dashboard changed everything."
              </p>
              <div className='testi-author'>
                <div className='testi-avatar bg-cyan'>PP</div>
                <div className='testi-author-info'>
                  <h4>Subhadip Mondal</h4>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className='testi-card'>
              <div className='stars'>
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className='testi-comment'>
                "The predictive cash-flow forecasting is spot on. It has helped me set clear saving goals and actually stick to them without stress."
              </p>
              <div className='testi-author'>
                <div className='testi-avatar bg-indigo'>RD</div>
                <div className='testi-author-info'>
                  <h4>Sumit Kumar</h4>
                  <p>Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section className='cta-section'>
        <div className='cta-mesh' aria-hidden />
        <div className='cta-inner'>
          <div className='cta-icons' aria-hidden>
            <svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z'/>
              <path d='M19 10v2a7 7 0 0 1-14 0v-2'/>
              <line x1='12' y1='19' x2='12' y2='22'/>
            </svg>
          </div>
          <h2 className='cta-title'>Ready for smarter finances?</h2>
          <p className='cta-body'>
            Join thousands of users leveraging AI-powered insights to take control of their
            financial future.
          </p>
          <a href='/auth/register'  className='btn-white'>
            Get Started Free
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M5 12h14M12 5l7 7-7 7'/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className='faq-section'>
        <div className='faq-inner'>
          <div className='section-head'>
            <div className='section-eyebrow'>FAQ</div>
            <h2 className='section-title'>Frequently asked questions</h2>
          </div>
          <div className='faq-list'>
            {[
              { q: "Is my financial data secure?", a: "Absolutely. We use bank-level 256-bit encryption. Your data is stored securely on our Appwrite backend and is never sold to third parties." },
              { q: "How does the AI categorization work?", a: "Our AI engine analyzes the transaction title and context to automatically assign it to the most relevant category. It learns from your edits to get smarter over time." },
              { q: "Can I use Fintract for free?", a: "Yes! Our Free tier includes basic expense tracking, debt management, and up to 50 transactions per month at no cost." },
              { q: "What devices are supported?", a: "Fintract is a responsive web application. It works perfectly on your desktop browser, tablet, and mobile phone." }
            ].map((faq, i) => (
              <details key={i} className='faq-item'>
                <summary className='faq-question'>
                  {faq.q}
                  <span className='faq-icon'>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M6 9l6 6 6-6'/></svg>
                  </span>
                </summary>
                <div className='faq-answer'><p>{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className='footer'>
        <div className='footer-inner'>
          <div className='footer-brand'>
            <a href='#' className='nav-logo'>
              <span className='logo-icon'>
                <svg width='18' height='18' viewBox='0 0 20 20' fill='none'>
                  <path d='M10 2L3 7v6l7 5 7-5V7L10 2z' fill='url(#logoGrad2)' />
                  <defs>
                    <linearGradient id='logoGrad2' x1='3' y1='2' x2='17' y2='18' gradientUnits='userSpaceOnUse'>
                      <stop stopColor='#2EC4A0' />
                      <stop offset='1' stopColor='#0EA5C9' />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              Fintrack
            </a>
            <p className='footer-tagline'>Smart money, intelligently managed.</p>
          </div>
          <div className='footer-links'>
            {[
              { head: 'Product', links: ['Features', 'Security', 'Pricing', 'Changelog'] },
              { head: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { head: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Contact'] },
            ].map((col) => (
              <div key={col.head} className='footer-col'>
                <h4>{col.head}</h4>
                {col.links.map((l) => <a key={l} href='#'>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className='footer-bottom'>
          <span>© 2025 Fintrack, Inc. All rights reserved.</span>
        </div>
      </footer>

      <style jsx global>{`
        /* ─── FONTS ─── */
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal:       #2EC4A0;
          --teal-mid:   #1DA884;
          --teal-dark:  #0D6B54;
          --cyan:       #0EA5C9;
          --bg:         #F4FBF9;
          --surface:    #FFFFFF;
          --border:     rgba(46,196,160,.18);
          --text:       #0D1F1B;
          --text-muted: #5A7A72;
          --font-head:  'Plus Jakarta Sans', sans-serif;
          --font-body:  'DM Sans', sans-serif;
          --radius-sm:  8px;
          --radius-md:  14px;
          --radius-lg:  22px;
          --radius-xl:  32px;
          --shadow-sm:  0 2px 12px rgba(0,0,0,.06);
          --shadow-md:  0 8px 32px rgba(0,0,0,.10);
          --shadow-lg:  0 24px 64px rgba(0,0,0,.14);
          --warning:    #F59E0B;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
        }

        /* ─── NAV ─── */
        .nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(244,251,249,.85);
          backdrop-filter: blur(18px) saturate(1.6);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1180px; margin: 0 auto;
          display: flex; align-items: center; gap: 32px;
          padding: 0 28px; height: 64px;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-head); font-weight: 800;
          font-size: 18px; color: var(--text); text-decoration: none;
          letter-spacing: -.3px;
        }
        .logo-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: linear-gradient(135deg,#E0FAF4,#C5F0E8);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(46,196,160,.3);
        }
        .nav-links {
          display: flex; gap: 28px; flex: 1;
          margin-left: 24px;
        }
        .nav-links a {
          font-size: 14px; font-weight: 500; color: var(--text-muted);
          text-decoration: none; transition: color .2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-actions { display: flex; align-items: center; gap: 12px; margin-left: auto; }
        .nav-login {
          font-size: 14px; font-weight: 500; color: var(--text-muted);
          text-decoration: none; padding: 8px 14px; transition: color .2s;
        }
        .nav-login:hover { color: var(--text); }
        .nav-cta {
          font-size: 14px; font-weight: 600; color: #fff;
          text-decoration: none; padding: 9px 20px; border-radius: 10px;
          background: linear-gradient(135deg, var(--teal), var(--cyan));
          box-shadow: 0 4px 14px rgba(46,196,160,.4);
          transition: transform .2s, box-shadow .2s;
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(46,196,160,.5); }

        /* ─── HERO ─── */
        .hero {
          position: relative; overflow: hidden;
          padding: 100px 28px 80px;
        }
        .hero-mesh {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 72% 40%, rgba(46,196,160,.14) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(14,165,201,.10) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 85% 85%, rgba(99,102,241,.07) 0%, transparent 60%);
        }
        .hero-inner {
          max-width: 1180px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
        }
        .hero-copy { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .hero-copy.visible { opacity: 1; transform: translateY(0); }
        .hero-visual { opacity: 0; transform: translateY(24px) scale(.97); transition: opacity .8s .15s ease, transform .8s .15s ease; }
        .hero-visual.visible { opacity: 1; transform: translateY(0) scale(1); }

        /* badge */
        .badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 14px; border-radius: 100px;
          background: rgba(46,196,160,.12);
          border: 1px solid rgba(46,196,160,.3);
          font-size: 13px; font-weight: 600; color: var(--teal-dark);
          margin-bottom: 28px; font-family: var(--font-head);
        }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 3px rgba(46,196,160,.25);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(46,196,160,.25); }
          50%      { box-shadow: 0 0 0 6px rgba(46,196,160,.10); }
        }

        /* headline */
        .headline {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(36px, 4.5vw, 54px);
          line-height: 1.1; letter-spacing: -1.5px;
          color: var(--text); margin-bottom: 22px;
        }
        .headline-accent {
          background: linear-gradient(120deg, var(--teal) 0%, var(--cyan) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-body {
          font-size: 17px; color: var(--text-muted); max-width: 440px;
          line-height: 1.7; margin-bottom: 36px;
        }

        /* CTA buttons */
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 12px;
          background: linear-gradient(135deg, var(--teal), var(--cyan));
          color: #fff; font-family: var(--font-head); font-weight: 700;
          font-size: 15px; text-decoration: none;
          box-shadow: 0 6px 24px rgba(46,196,160,.4);
          transition: transform .2s, box-shadow .2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(46,196,160,.5); }
        .btn-ghost {
          cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 12px;
          background: var(--surface); color: var(--text);
          font-family: var(--font-head); font-weight: 600;
          font-size: 15px; text-decoration: none;
          border: 1.5px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: border-color .2s, transform .2s;
        }
        .btn-ghost:hover { border-color: rgba(46,196,160,.5); transform: translateY(-1px); }
        .w-full { width: 100%; }
        .justify-center { justify-content: center; }

        /* trust */
        .trust-row { display: flex; align-items: center; gap: 12px; }
        .trust-avatars { display: flex; }
        .trust-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          border: 2.5px solid var(--surface);
          margin-left: -8px; first-child { margin-left: 0; }
        }
        .trust-avatars .trust-avatar:first-child { margin-left: 0; }
        .trust-text { font-size: 13.5px; color: var(--text-muted); }
        .trust-text strong { color: var(--text); font-weight: 700; }

        /* ─── HERO ILLUSTRATION ─── */
        .hero-illus {
          position: relative; width: 100%; aspect-ratio: 1;
          max-width: 520px; margin: 0 auto;
        }
        .illus-glow {
          position: absolute; inset: 15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,196,160,.2) 0%, transparent 70%);
          filter: blur(32px);
          animation: breathe 5s ease-in-out infinite;
        }
        @keyframes breathe {
          0%,100% { transform: scale(1); opacity: .7; }
          50%      { transform: scale(1.12); opacity: 1; }
        }
        .illus-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }

        /* ─── STATS BAR ─── */
        .stats-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--surface);
        }
        .stats-inner {
          max-width: 1180px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4,1fr);
          padding: 0 28px;
        }
        .stat-item {
          display: flex; flex-direction: column; align-items: center;
          padding: 28px 16px;
          border-right: 1px solid var(--border);
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: var(--font-head); font-weight: 800;
          font-size: 28px; color: var(--text); letter-spacing: -1px;
          background: linear-gradient(135deg, var(--teal), var(--cyan));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

        /* ─── FEATURES ─── */
        .features { padding: 100px 28px; }
        .features-inner { max-width: 1180px; margin: 0 auto; }
        .section-head { text-align: center; margin-bottom: 60px; }
        .section-eyebrow {
          display: inline-block; margin-bottom: 14px;
          font-family: var(--font-head); font-size: 12px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; color: var(--teal-dark);
          background: rgba(46,196,160,.1); padding: 6px 16px; border-radius: 100px;
        }
        .section-title {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.2; letter-spacing: -1px; color: var(--text);
        }
        .section-title.left { text-align: left; margin-bottom: 18px; }

        .feat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .feat-card {
          position: relative; overflow: hidden;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px 26px;
          transition: transform .3s, box-shadow .3s, border-color .3s;
          cursor: default;
        }
        .feat-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: rgba(46,196,160,.4);
        }
        .feat-card.highlight {
          background: linear-gradient(155deg, #E8FAF5 0%, #F0FAFC 100%);
          border-color: rgba(46,196,160,.4);
        }
        .feat-card::before {
          content: ''; position: absolute;
          inset: 0; border-radius: inherit;
          background: linear-gradient(135deg, rgba(46,196,160,.05), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .feat-card:hover::before { opacity: 1; }
        .feat-card-top {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 18px;
        }
        .feat-icon-wrap {
          width: 46px; height: 46px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
        }
        .feat-icon-wrap.teal   { background: rgba(46,196,160,.14); color: var(--teal-dark); }
        .feat-icon-wrap.cyan   { background: rgba(14,165,201,.12); color: #0C6A8A; }
        .feat-icon-wrap.blue   { background: rgba(99,102,241,.10); color: #4338CA; }
        .feat-icon-wrap.indigo { background: rgba(79,70,229,.10);  color: #3730A3; }
        .feat-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; padding: 4px 10px;
          border-radius: 100px; background: rgba(46,196,160,.15); color: var(--teal-dark);
        }
        .feat-card h3 {
          font-family: var(--font-head); font-weight: 700; font-size: 16px;
          color: var(--text); margin-bottom: 10px; letter-spacing: -.3px;
        }
        .feat-card p {
          font-size: 14px; color: var(--text-muted); line-height: 1.65;
        }

        /* ─── AI SECTION ─── */
        .ai-section { padding: 100px 28px; background: var(--surface); }
        .ai-inner {
          max-width: 1180px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 72px; align-items: center;
        }
        .ai-body { font-size: 16px; color: var(--text-muted); line-height: 1.75; margin-bottom: 28px; }
        .ai-list { list-style: none; margin-bottom: 36px; display: flex; flex-direction: column; gap: 14px; }
        .ai-list li {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 15px; color: var(--text);
        }
        .ai-check {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(46,196,160,.15); color: var(--teal-dark);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        /* Dashboard mockup */
        .ai-dash {
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--radius-xl); padding: 24px;
          box-shadow: var(--shadow-lg);
        }
        .dash-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .dash-title { font-family: var(--font-head); font-weight: 700; font-size: 15px; color: var(--text); }
        .dash-pill {
          font-size: 11px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 5px 12px;
          border-radius: 100px; background: rgba(46,196,160,.15); color: var(--teal-dark);
        }
        .dash-balance {
          font-family: var(--font-head); font-weight: 800;
          font-size: 38px; letter-spacing: -2px; color: var(--text);
          margin-bottom: 4px;
        }
        .dash-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 22px; }
        .dash-chart { height: 80px; display: flex; align-items: flex-end; gap: 6px; margin-bottom: 22px; }
        .dash-bar {
          flex: 1; border-radius: 6px 6px 0 0;
          background: linear-gradient(180deg, rgba(46,196,160,.7), rgba(14,165,201,.4));
          transition: height .5s ease;
        }
        .dash-bar.active {
          background: linear-gradient(180deg, var(--teal), var(--cyan));
          box-shadow: 0 -4px 16px rgba(46,196,160,.4);
        }
        .dash-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .dash-tag {
          font-size: 12px; font-weight: 600; padding: 6px 12px;
          border-radius: 100px; background: var(--surface);
          border: 1px solid var(--border); color: var(--text-muted);
          display: flex; align-items: center; gap: 5px;
        }
        .dash-tag-dot { width: 6px; height: 6px; border-radius: 50%; }

        /* ─── AI CHAT SECTION ─── */
        .chat-feature-section { padding: 100px 28px; background: var(--bg); }
        .chat-feature-inner {
          max-width: 1180px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 72px; align-items: center;
        }
        .chat-feature-body { font-size: 16px; color: var(--text-muted); line-height: 1.75; margin-bottom: 28px; }
        
        .chat-mockup {
          background: #0f172a; border: 1px solid rgba(46,196,160,.2);
          border-radius: var(--radius-xl); overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,.15);
          display: flex; flex-direction: column;
        }
        .chat-header {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.02);
        }
        .chat-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--cyan));
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .chat-name { color: #fff; font-family: var(--font-head); font-weight: 700; font-size: 14px; line-height: 1.2; }
        .chat-status { color: var(--teal); font-size: 11px; font-weight: 600; line-height: 1.2; }
        .chat-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .chat-bubble {
          max-width: 85%; padding: 12px 16px; border-radius: 16px;
          font-size: 14px; line-height: 1.5;
        }
        .chat-bubble.user {
          align-self: flex-end; background: linear-gradient(135deg, var(--teal-mid), var(--teal-dark));
          color: #fff; border-bottom-right-radius: 4px;
        }
        .chat-bubble.ai {
          align-self: flex-start; background: #1e293b;
          color: #cbd5e1; border-bottom-left-radius: 4px; border: 1px solid rgba(255,255,255,.05);
        }
        .chat-input-area {
          padding: 16px 20px; border-top: 1px solid rgba(255,255,255,.1);
          display: flex; gap: 12px; align-items: center;
        }
        .chat-input-pill {
          flex: 1; background: #1e293b; border-radius: 100px;
          padding: 10px 16px; color: #64748b; font-size: 13px;
          border: 1px solid rgba(255,255,255,.05);
        }
        .chat-send {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--cyan));
          display: flex; align-items: center; justify-content: center; color: #fff;
          box-shadow: 0 4px 12px rgba(46,196,160,.3);
        }

        /* ─── PRICING SECTION ─── */
        .pricing-section { padding: 100px 28px; background: var(--bg); }
        .pricing-inner { max-width: 1180px; margin: 0 auto; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
        .pricing-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: var(--radius-lg); padding: 40px 32px;
          display: flex; flex-direction: column; transition: transform .3s, box-shadow .3s;
        }
        .pricing-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
        .pricing-card.popular {
          border-color: rgba(46,196,160,.4);
          background: linear-gradient(155deg, #E8FAF5 0%, #F0FAFC 100%);
          position: relative;
        }
        .popular-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, var(--teal), var(--cyan)); color: #fff;
          font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px;
          border-radius: 100px; letter-spacing: 1px;
        }
        .plan-name { font-family: var(--font-head); font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 12px; }
        .plan-price { font-family: var(--font-head); font-size: 36px; font-weight: 800; color: var(--text); letter-spacing: -1px; margin-bottom: 24px; display: flex; align-items: baseline; gap: 4px; }
        .plan-price span { font-size: 15px; color: var(--text-muted); font-weight: 500; letter-spacing: 0; }
        .plan-features { list-style: none; margin-bottom: 36px; flex: 1; display: flex; flex-direction: column; gap: 14px; }
        .plan-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: var(--text-muted); }
        .plan-check { color: var(--teal); flex-shrink: 0; display: flex; margin-top: 2px; }

        /* ─── FAQ SECTION ─── */
        .faq-section { padding: 100px 28px; background: var(--surface); }
        .faq-inner { max-width: 800px; margin: 0 auto; }
        .faq-list { display: flex; flex-direction: column; gap: 16px; }
        .faq-item {
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
          transition: box-shadow .3s, border-color .3s;
        }
        .faq-item:hover { border-color: rgba(46,196,160,.4); }
        .faq-item[open] { border-color: rgba(46,196,160,.5); box-shadow: var(--shadow-sm); background: var(--surface); }
        .faq-question {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px; font-family: var(--font-head); font-weight: 700;
          font-size: 16px; color: var(--text); cursor: pointer;
          list-style: none; /* Hide default arrow */
        }
        .faq-question::-webkit-details-marker { display: none; }
        .faq-icon { color: var(--teal); transition: transform .3s; }
        .faq-item[open] .faq-icon { transform: rotate(180deg); }
        .faq-answer { padding: 0 24px 24px; font-size: 15px; color: var(--text-muted); line-height: 1.6; }

        /* ─── TESTIMONIALS SECTION ─── */
        .testi-section { padding: 100px 28px; background: var(--bg); }
        .testi-inner { max-width: 1180px; margin: 0 auto; }
        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
        .testi-card {
          background: var(--bg); border: 1.5px solid var(--border);
          border-radius: var(--radius-lg); padding: 32px;
          display: flex; flex-direction: column; background: var(--surface);
        }
        .stars { display: flex; gap: 4px; color: var(--warning); margin-bottom: 16px; }
        .testi-comment { font-size: 15px; color: var(--text); line-height: 1.6; margin-bottom: 28px; flex: 1; }
        .testi-author { display: flex; align-items: center; gap: 14px; }
        .testi-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--teal); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-head); font-weight: 700; font-size: 16px;
        }
        .testi-avatar.bg-cyan { background: var(--cyan); }
        .testi-avatar.bg-indigo { background: #6366F1; }
        .testi-author-info h4 {
          font-family: var(--font-head); font-size: 14.5px;
          font-weight: 700; color: var(--text); line-height: 1.2; margin-bottom: 2px;
        }
        .testi-author-info p {
          font-size: 12px; color: var(--text-muted); line-height: 1.2;
        }

        /* ─── CTA SECTION ─── */
        .cta-section {
          position: relative; overflow: hidden;
          margin: 0 28px 80px; border-radius: var(--radius-xl);
          background: linear-gradient(135deg, #0D6B54 0%, #0C4A6E 100%);
          padding: 80px 48px; text-align: center;
        }
        .cta-mesh {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 70% at 10% 50%, rgba(46,196,160,.2) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 90% 50%, rgba(14,165,201,.2) 0%, transparent 60%),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E");
        }
        .cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
        .cta-icons {
          display: flex; justify-content: center; gap: 0; margin-bottom: 22px; color: rgba(255,255,255,.6);
        }
        .cta-title {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(28px, 4vw, 44px); color: #fff;
          letter-spacing: -1px; margin-bottom: 16px;
        }
        .cta-body { font-size: 17px; color: rgba(255,255,255,.75); line-height: 1.7; margin-bottom: 36px; }
        .btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 32px; border-radius: 12px;
          background: #fff; color: var(--teal-dark);
          font-family: var(--font-head); font-weight: 700; font-size: 15px;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(0,0,0,.15);
          transition: transform .2s, box-shadow .2s;
        }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,.2); }

        /* ─── FOOTER ─── */
        .footer { padding: 60px 28px 24px; }
        .footer-inner {
          max-width: 1180px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr auto;
          gap: 48px; padding-bottom: 48px;
          border-bottom: 1px solid var(--border);
        }
        .footer-brand .nav-logo { margin-bottom: 12px; }
        .footer-tagline { font-size: 14px; color: var(--text-muted); max-width: 220px; }
        .footer-links { display: flex; gap: 56px; }
        .footer-col { display: flex; flex-direction: column; gap: 12px; }
        .footer-col h4 {
          font-family: var(--font-head); font-weight: 700; font-size: 13px;
          color: var(--text); letter-spacing: .3px;
        }
        .footer-col a {
          font-size: 14px; color: var(--text-muted); text-decoration: none; transition: color .2s;
        }
        .footer-col a:hover { color: var(--teal); }
        .footer-bottom {
          max-width: 1180px; margin: 0 auto; padding-top: 24px;
          font-size: 13px; color: var(--text-muted); text-align: center;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .hero-visual { order: -1; }
          .ai-inner, .chat-feature-inner { grid-template-columns: 1fr; }
          .chat-feature-visual { order: 1; }
          .pricing-grid, .testi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .feat-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: repeat(2,1fr); }
          .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
          .footer-inner { grid-template-columns: 1fr; }
          .footer-links { flex-wrap: wrap; gap: 32px; }
          .nav-links { display: none; }
          .cta-section { margin: 0 16px 48px; padding: 56px 28px; }
          .nav-inner { gap: 0 }
          .pricing-grid, .testi-grid { grid-template-columns: 1fr; }
        }
        }
      `}</style>
    </main>
  );
}

/* ─── Hero Illustration ─────────────────────────────── */
function HeroIllustration() {
  return (
    <div className='hero-illus'>
      <div className='illus-glow' />
      <div className='illus-float'>
        <svg viewBox='0 0 520 520' fill='none' xmlns='http://www.w3.org/2000/svg' style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 32px 64px rgba(46,196,160,.25))' }}>
          <defs>
            {/* Gradients */}
            <linearGradient id='coreGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop stopColor='#2EC4A0' offset='0%' />
              <stop stopColor='#0EA5C9' offset='100%' />
            </linearGradient>
            <linearGradient id='aiGlow' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop stopColor='#7DD6F0' offset='0%' />
              <stop stopColor='#2EC4A0' offset='100%' />
            </linearGradient>
            <radialGradient id='pulseGrad' cx='50%' cy='50%' r='50%'>
              <stop stopColor='#2EC4A0' stopOpacity='0.4' offset='0%' />
              <stop stopColor='#2EC4A0' stopOpacity='0' offset='100%' />
            </radialGradient>
            <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
              <feGaussianBlur stdDeviation='6' result='coloredBlur'/>
              <feMerge>
                <feMergeNode in='coloredBlur'/>
                <feMergeNode in='SourceGraphic'/>
              </feMerge>
            </filter>
            <filter id='softGlow'>
              <feGaussianBlur stdDeviation='3' result='blur' />
              <feMerge><feMergeNode in='blur'/><feMergeNode in='SourceGraphic'/></feMerge>
            </filter>
            <style>{`
              @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
              @keyframes glow-pulse { 0%, 100% { filter: drop-shadow(0 0 8px rgba(46,196,160,.4)); } 50% { filter: drop-shadow(0 0 20px rgba(46,196,160,.8)); } }
              @keyframes pulse { 0%, 100% { r: 45px; opacity: 0; } 50% { r: 65px; opacity: 0.3; } }
              .float-item { animation: float 4s ease-in-out infinite; }
              .core-element { animation: glow-pulse 2.5s ease-in-out infinite; }
              .pulse-ring { animation: pulse 2s ease-out infinite; }
            `}</style>
          </defs>

          {/* Background Mesh */}
          <rect x='0' y='0' width='520' height='520' fill='rgba(244,251,249,.5)' opacity='0' />
          <circle cx='260' cy='260' r='240' fill='url(#pulseGrad)' opacity='0.3' />

          {/* AI Core Central Hub */}
          <g className='core-element'>
            <circle cx='260' cy='260' r='55' fill='url(#coreGradient)' filter='url(#glow)' opacity='0.95' />
            <circle cx='260' cy='260' r='50' fill='rgba(255,255,255,.1)' strokeWidth='2' stroke='rgba(255,255,255,.3)' />
            {/* AI Brain Icon */}
            <g transform='translate(260, 260)'>
              <circle cx='0' cy='-8' r='4' fill='white' />
              <circle cx='-8' cy='4' r='4' fill='white' />
              <circle cx='8' cy='4' r='4' fill='white' />
              <circle cx='0' cy='12' r='4' fill='white' />
              <line x1='0' y1='-4' x2='-6' y2='0' stroke='white' strokeWidth='1.5' opacity='0.6' />
              <line x1='0' y1='-4' x2='6' y2='0' stroke='white' strokeWidth='1.5' opacity='0.6' />
              <line x1='-6' y1='4' x2='0' y2='8' stroke='white' strokeWidth='1.5' opacity='0.6' />
              <line x1='6' y1='4' x2='0' y2='8' stroke='white' strokeWidth='1.5' opacity='0.6' />
            </g>
          </g>

          {/* Pulse Ring */}
          <circle cx='260' cy='260' r='45' fill='none' stroke='url(#coreGradient)' strokeWidth='2' className='pulse-ring' opacity='0.6' />

          {/* Left Category Icons */}
          {/* Groceries */}
          <g transform='translate(90, 140)'>
            <circle cx='0' cy='0' r='32' fill='rgba(46,196,160,.15)' stroke='rgba(46,196,160,.4)' strokeWidth='2' />
            <path d='M -8 -6 L -2 0 L 8 -8 M -8 4 L 2 8 L 8 4' stroke='#2EC4A0' strokeWidth='2.5' fill='none' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          {/* Utilities */}
          <g transform='translate(70, 260)'>
            <circle cx='0' cy='0' r='32' fill='rgba(46,196,160,.15)' stroke='rgba(46,196,160,.4)' strokeWidth='2' />
            <path d='M -4 -8 L -4 4 M 0 -6 L 0 6 M 4 -8 L 4 4 M -8 8 L 8 8' stroke='#2EC4A0' strokeWidth='2.5' fill='none' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          {/* Education */}
          <g transform='translate(100, 380)'>
            <circle cx='0' cy='0' r='32' fill='rgba(46,196,160,.15)' stroke='rgba(46,196,160,.4)' strokeWidth='2' />
            <path d='M -10 -6 L 0 -10 L 10 -6 L 10 8 L -10 8 Z M -4 0 L 4 0 M -4 4 L 4 4' stroke='#2EC4A0' strokeWidth='2.5' fill='none' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          {/* Right Category Icons */}
          {/* Transport */}
          <g transform='translate(430, 140)'>
            <circle cx='0' cy='0' r='32' fill='rgba(14,165,201,.15)' stroke='rgba(14,165,201,.4)' strokeWidth='2' />
            <path d='M -10 4 L -6 -6 L 6 -6 L 10 4 M -8 4 L -8 8 M 8 4 L 8 8 M -6 8 L 6 8' stroke='#0EA5C9' strokeWidth='2.5' fill='none' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          {/* Healthcare */}
          <g transform='translate(450, 260)'>
            <circle cx='0' cy='0' r='32' fill='rgba(14,165,201,.15)' stroke='rgba(14,165,201,.4)' strokeWidth='2' />
            <path d='M -2 -8 L -2 8 M -8 2 L 8 2' stroke='#0EA5C9' strokeWidth='2.5' fill='none' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          {/* Entertainment */}
          <g transform='translate(420, 380)'>
            <circle cx='0' cy='0' r='32' fill='rgba(14,165,201,.15)' stroke='rgba(14,165,201,.4)' strokeWidth='2' />
            <path d='M -8 -4 Q -8 -8 -4 -8 Q 0 -8 0 -4 L 0 8 Q -4 6 -8 8 Z M 8 -4 Q 8 -8 4 -8 Q 0 -8 0 -4 L 0 8 Q 4 6 8 8 Z' stroke='#0EA5C9' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round' />
          </g>

          {/* Connection Lines - Animated */}
          <g strokeDasharray='4 4' opacity='0.4'>
            <line x1='260' y1='260' x2='90' y2='140' stroke='#2EC4A0' strokeWidth='1.5' />
            <line x1='260' y1='260' x2='70' y2='260' stroke='#2EC4A0' strokeWidth='1.5' />
            <line x1='260' y1='260' x2='100' y2='380' stroke='#2EC4A0' strokeWidth='1.5' />
            <line x1='260' y1='260' x2='430' y2='140' stroke='#0EA5C9' strokeWidth='1.5' />
            <line x1='260' y1='260' x2='450' y2='260' stroke='#0EA5C9' strokeWidth='1.5' />
            <line x1='260' y1='260' x2='420' y2='380' stroke='#0EA5C9' strokeWidth='1.5' />
          </g>

          {/* Top AI Badge */}
          <g className='float-item' style={{ animationDelay: '0.3s' }}>
            <rect x='160' y='30' width='200' height='48' rx='14' fill='rgba(255,255,255,.9)' stroke='rgba(46,196,160,.3)' strokeWidth='2' />
            <circle cx='180' cy='54' r='6' fill='rgba(46,196,160,.3)' />
            <path d='M 175 54 L 178 57 L 185 50' stroke='#2EC4A0' strokeWidth='1.5' fill='none' strokeLinecap='round' strokeLinejoin='round' />
            <text x='200' y='48' fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight='700' fontSize='13' fill='#0D1F1B'>AI Smart Analytics</text>
            <text x='200' y='62' fontFamily="'DM Sans', sans-serif" fontWeight='400' fontSize='11' fill='#5A7A72'>Real-time insights</text>
          </g>

          {/* Bottom Insight Badge */}
          <g className='float-item' style={{ animationDelay: '0.5s' }}>
            <rect x='150' y='450' width='220' height='44' rx='12' fill='rgba(255,255,255,.88)' stroke='rgba(14,165,201,.3)' strokeWidth='2' />
            <circle cx='172' cy='472' r='5' fill='rgba(14,165,201,.3)' />
            <path d='M 168 472 L 170 474 L 176 468' stroke='#0EA5C9' strokeWidth='1.2' fill='none' strokeLinecap='round' strokeLinejoin='round' />
            <text x='190' y='469' fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight='600' fontSize='12' fill='#0D1F1B'>Optimized Tracking</text>
            <text x='190' y='482' fontFamily="'DM Sans', sans-serif" fontWeight='400' fontSize='10' fill='#5A7A72'>Indian categories</text>
          </g>

          {/* Floating Particles */}
          <g opacity='0.2'>
            <circle cx='140' cy='100' r='2' fill='#2EC4A0' className='float-item' style={{ animationDelay: '0.2s' }} />
            <circle cx='380' cy='420' r='2' fill='#0EA5C9' className='float-item' style={{ animationDelay: '0.6s' }} />
            <circle cx='480' cy='200' r='1.5' fill='#6366F1' className='float-item' style={{ animationDelay: '0.8s' }} />
            <circle cx='50' cy='350' r='1.5' fill='#F59E0B' className='float-item' style={{ animationDelay: '1s' }} />
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ─── AI Dashboard Mockup ──────────────────────────── */
function AiDashboardMockup() {
  const heights = [35, 55, 45, 70, 60, 85, 65];
  return (
    <div className='ai-dash'>
      <div className='dash-header'>
        <span className='dash-title'>Monthly Overview</span>
        <span className='dash-pill'>AI Live</span>
      </div>
      <div className='dash-balance'>₹84,320</div>
      <div className='dash-sub'>Total balance · Updated just now</div>
      <div className='dash-chart'>
        {heights.map((h, i) => (
          <div key={i} className={`dash-bar${i === 5 ? ' active' : ''}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className='dash-tags'>
        {[
          { color: '#2EC4A0', label: 'Savings +18%' },
          { color: '#0EA5C9', label: 'Food ₹4,200' },
          { color: '#6366F1', label: 'Goal 82%' },
        ].map((t) => (
          <div key={t.label} className='dash-tag'>
            <span className='dash-tag-dot' style={{ background: t.color }} />
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── AI Chat Mockup ─────────────────────────────── */
function AiChatMockup() {
  return (
    <div className='chat-mockup'>
      <div className='chat-header'>
        <div className='chat-avatar'><BotIcon /></div>
        <div>
          <div className='chat-name'>Fintract AI</div>
          <div className='chat-status'>Online • Ready to help</div>
        </div>
      </div>
      <div className='chat-body'>
        <div className='chat-bubble user'>
          Log a coffee for ₹150 from Starbucks
        </div>
        <div className='chat-bubble ai'>
          Got it! I've logged ₹150 for "Coffee" under the <strong>Food & Dining</strong> category. ☕
        </div>
        <div className='chat-bubble user'>
          How much have I spent on food this month?
        </div>
        <div className='chat-bubble ai'>
          You've spent ₹4,200 on Food & Dining so far this month. You're 18% below your usual average!
        </div>
      </div>
      <div className='chat-input-area'>
        <div className='chat-input-pill'>Ask Fintract AI...</div>
        <div className='chat-send'><SendIcon /></div>
      </div>
    </div>
  );
}

/* ─── Feature card sub-component ──────────────────── */
function FeatureCard({
  icon, color, title, desc, tag, highlight,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
  tag?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`feat-card${highlight ? ' highlight' : ''}`}>
      <div className='feat-card-top'>
        <div className={`feat-icon-wrap ${color}`}>{icon}</div>
        {tag && <span className='feat-tag'>{tag}</span>}
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

/* ─── SVG Icons ─────────────────────────────────── */
const MicIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z'/>
    <path d='M19 10v2a7 7 0 0 1-14 0v-2'/>
    <line x1='12' y1='19' x2='12' y2='22'/>
  </svg>
);
const BotIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M12 8V4H8'/>
    <rect width='16' height='12' x='4' y='8' rx='2'/>
    <path d='M2 14h2'/><path d='M20 14h2'/><path d='M15 13v2'/><path d='M9 13v2'/>
  </svg>
);
const SendIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <line x1='22' y1='2' x2='11' y2='13'/>
    <polygon points='22 2 15 22 11 13 2 9 22 2'/>
  </svg>
);
const CheckIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
    <polyline points='20 6 9 17 4 12' />
  </svg>
);
const StarIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/>
  </svg>
);
const ChartIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <line x1='18' y1='20' x2='18' y2='10'/><line x1='12' y1='20' x2='12' y2='4'/>
    <line x1='6' y1='20' x2='6' y2='14'/><line x1='2' y1='20' x2='22' y2='20'/>
  </svg>
);
const TargetIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='6'/><circle cx='12' cy='12' r='2'/>
  </svg>
);
const LockIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='11' width='18' height='11' rx='2' ry='2'/>
    <path d='M7 11V7a5 5 0 0 1 10 0v4'/>
  </svg>
);