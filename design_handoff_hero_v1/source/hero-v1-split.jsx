/* ==========================================================================
   Hero Variant 1 — SPLIT (refined)
   ============================================================================
   Cream column on the left, photo on the right.
   Refinements:
   - Slim navbar above
   - Tighter, more confident typography (oversized H1, accent on key word)
   - Author/expert signature line — adds trust
   - Bullets with mini-icons instead of generic checks
   - "Цена от" inline next to CTA + hint
   - Photo: rounded inset frame, vertical caption strip, expert badge
   - Trust strip: 3 numeric metrics with vertical dividers, anchored bottom
   ========================================================================= */

function V1NavBar() {
  return (
    <div className="v1nav">
      <nav className="v1nav__links">
        <a>Подбор</a>
        <a>Курорты</a>
        <a>Отели</a>
        <a>О нас</a>
      </nav>
      <div className="v1nav__phone">
        <span className="v1nav__pdot" />
        +7 495 123-45-67
      </div>
    </div>
  );
}

function V1BulletIcon({ kind }) {
  // Three custom inline glyphs for the three bullets
  if (kind === 'beach') return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 18c1.5-2 4-3 7-3s5.5 1 7 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 8l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
  if (kind === 'kids') return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 8.5c.5.5 1.4.8 2.5.8s2-.3 2.5-.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
  return ( // budget
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="6.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 12h.5M17 12h.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function HeroV1Desktop() {
  const H = window.HERO;
  const bullets = [
    { kind: 'beach', text: 'Пологий песок и безопасные бухты' },
    { kind: 'kids', text: 'Детские клубы по возрастам — от 2 до 14' },
    { kind: 'budget', text: 'Подбор под бюджет — без переплат и комиссий' },
  ];
  return (
    <div className="v1 hero-root">
      <V1NavBar />

      <div className="v1__grid">
        {/* LEFT — text */}
        <div className="v1__text">
          <span className="hero-chip v1__chip">
            <span className="hero-chip__dot" />
            Семейный отдых · с 2012 · 14 лет
          </span>

          <h1 className="hero-title v1__title">
            Турция.<br />
            Семейные отели<br />
            с&nbsp;<span className="v1__title-accent">безупречным&nbsp;сервисом</span>.
          </h1>

          <p className="v1__lede">
            Отбираем и&nbsp;тестируем отели с&nbsp;детьми сами&nbsp;— подскажем, где&nbsp;ребёнку правда хорошо.
          </p>

          <ul className="v1__bullets">
            {bullets.map((b, i) => (
              <li key={i}>
                <span className="v1__bicon"><V1BulletIcon kind={b.kind} /></span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>

          <div className="v1__cta-row">
            <button className="hero-cta v1__cta">
              {H.cta}
              <svg className="hero-cta__arrow" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="v1__cta-meta">
              <div className="v1__price">
                от <b>89&thinsp;900&nbsp;₽</b> <span>/ за&nbsp;семью на&nbsp;7&nbsp;ночей</span>
              </div>
              <div className="v1__hint">{H.hint}</div>
            </div>
          </div>

          <div className="v1__trust">
            <div className="v1__trust-item">
              <span className="v1__trust-num">312</span>
              <span className="v1__trust-cap">отелей<br/>проверены лично</span>
            </div>
            <span className="v1__trust-div" />
            <div className="v1__trust-item">
              <span className="v1__trust-num">9.6<i>/10</i></span>
              <span className="v1__trust-cap">оценка<br/>наших семей</span>
            </div>
            <span className="v1__trust-div" />
            <div className="v1__trust-item">
              <span className="v1__trust-num">4 200+</span>
              <span className="v1__trust-cap">семей отдохнули<br/>с&nbsp;нами</span>
            </div>
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="v1__media-wrap">
          <div className="v1__media hero-media">
            <img src={H.img} alt="" />
            <div className="hero-media__dim" />

            {/* Vertical caption */}
            <div className="v1__caption">
              <span className="v1__caption-dot" />
              Кемер · Beldibi Beach · июль&nbsp;2025
            </div>

            <div className="hero-media__badge">Видео · 0:18</div>
          </div>
        </div>
      </div>

      <style>{`
        .v1 { background: var(--hero-bg); height: 100%; display: flex; flex-direction: column; }

        /* ── Navbar ── */
        .v1nav {
          height: 64px;
          padding: 0 40px;
          display: flex; align-items: center; gap: 40px;
          border-bottom: 1px solid var(--hero-line);
          flex-shrink: 0;
          background: var(--hero-bg);
        }
        .v1nav__logo {
          display: flex; align-items: center; gap: 10px;
          font-weight: 800; font-size: 20px; letter-spacing: -0.02em;
          color: var(--hero-ink);
        }
        .v1nav__mark { color: var(--hero-accent); font-size: 22px; }
        .v1nav__name i { font-style: normal; font-weight: 500; color: var(--hero-ink-soft); }
        .v1nav__links { display: flex; gap: 28px; flex: 1; }
        .v1nav__links a {
          font-size: 13px; font-weight: 600; color: var(--hero-ink); cursor: pointer;
          letter-spacing: 0.01em;
        }
        .v1nav__links a:hover { color: var(--hero-accent); }
        .v1nav__phone {
          font-size: 13px; font-weight: 700; color: var(--hero-ink);
          display: flex; align-items: center; gap: 8px;
        }
        .v1nav__pdot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #46c474;
          box-shadow: 0 0 0 3px rgba(70,196,116,.22);
        }

        /* ── Grid ── */
        .v1__grid {
          flex: 1; min-height: 0;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
        }

        /* ── Text column ── */
        .v1__text {
          padding: 56px 56px 48px 56px;
          display: flex; flex-direction: column;
          gap: 22px;
          max-width: 680px;
        }
        .v1__chip { align-self: flex-start; }
        .v1__title {
          font-size: 60px;
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin-top: 4px;
        }
        .v1__title-accent {
          font-style: italic;
          font-weight: 800;
          background: linear-gradient(180deg, #1a3f3a 0%, #2EBEAE 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
          padding-right: 6px;
        }
        .v1__title-accent::after {
          content: "";
          position: absolute;
          left: 0; right: 6px; bottom: 4px;
          height: 6px;
          background: rgba(46,190,174,0.22);
          z-index: -1;
          border-radius: 2px;
        }
        .v1__lede {
          margin: 0;
          font-size: 17px;
          line-height: 1.45;
          color: var(--hero-ink-soft);
          font-weight: 500;
          max-width: 480px;
          text-wrap: pretty;
        }
        .v1__bullets {
          list-style: none; margin: 4px 0 0; padding: 0;
          display: grid; gap: 12px;
        }
        .v1__bullets li {
          display: flex; align-items: center; gap: 14px;
          font-size: 15px; font-weight: 600;
          color: var(--hero-ink);
        }
        .v1__bicon {
          flex-shrink: 0;
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(46,190,174,0.10);
          color: var(--hero-accent);
          display: flex; align-items: center; justify-content: center;
        }
        .v1__bicon svg { width: 20px; height: 20px; }

        /* ── CTA row ── */
        .v1__cta-row {
          display: flex; align-items: center; gap: 22px;
          margin-top: 8px; flex-wrap: wrap;
        }
        .v1__cta { padding: 19px 28px; font-size: 13px; }
        .v1__cta-meta { display: flex; flex-direction: column; gap: 4px; }
        .v1__price {
          font-size: 13px; color: var(--hero-ink-soft); font-weight: 500;
        }
        .v1__price b {
          font-weight: 800; color: var(--hero-ink); font-size: 16px;
          letter-spacing: -0.01em;
        }
        .v1__price span { font-size: 12px; }
        .v1__hint {
          font-size: 11px; font-weight: 600;
          color: var(--hero-ink-soft);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── Trust ── */
        .v1__trust {
          margin-top: auto;
          padding-top: 28px;
          border-top: 1px solid var(--hero-line);
          display: flex; align-items: center; gap: 28px;
        }
        .v1__trust-item {
          display: flex; flex-direction: column; gap: 4px;
        }
        .v1__trust-num {
          font-size: 26px; font-weight: 800;
          color: var(--hero-ink);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .v1__trust-num i {
          font-style: normal;
          font-size: 16px; font-weight: 600;
          color: var(--hero-ink-soft);
        }
        .v1__trust-cap {
          font-size: 11px; font-weight: 500;
          color: var(--hero-ink-soft);
          line-height: 1.3;
          letter-spacing: 0.01em;
        }
        .v1__trust-div {
          width: 1px; height: 38px;
          background: var(--hero-line);
        }

        /* ── Media ── */
        .v1__media-wrap {
          padding: 24px 24px 24px 0;
          display: flex;
        }
        .v1__media {
          flex: 1; min-width: 0;
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(14,27,26,0.18), 0 8px 20px rgba(14,27,26,0.10);
        }
        .v1__caption {
          position: absolute;
          left: 18px; top: 18px;
          padding: 7px 11px;
          background: rgba(255,255,255,0.16);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: flex; align-items: center; gap: 7px;
        }
        .v1__caption-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #fff;
        }

        .v1__expert {
          position: absolute;
          left: 18px; bottom: 18px;
          right: 18px;
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px 12px 12px;
          background: rgba(255,255,255,0.94);
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.18);
          backdrop-filter: blur(12px);
        }
        .v1__expert-ava {
          width: 44px; height: 44px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: #ddd;
          border: 2px solid #fff;
        }
        .v1__expert-ava img { width: 100%; height: 100%; object-fit: cover; }
        .v1__expert-text { flex: 1; min-width: 0; }
        .v1__expert-name {
          font-size: 13px; font-weight: 800;
          color: var(--hero-ink);
          letter-spacing: -0.01em;
        }
        .v1__expert-role {
          font-size: 11px; font-weight: 500;
          color: var(--hero-ink-soft);
          letter-spacing: 0.01em;
          margin-top: 2px;
        }
        .v1__expert-mark {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--hero-accent);
          color: #fff;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .v1__expert-mark svg { width: 16px; height: 16px; }

        /* badge override pos so it doesn't collide with expert card */
        .v1__media .hero-media__badge { right: 18px; top: 18px; bottom: auto; }
      `}</style>
    </div>
  );
}

function HeroV1Mobile() {
  const H = window.HERO;
  const bullets = [
    { kind: 'beach', text: 'Пологий песок, безопасные бухты' },
    { kind: 'kids', text: 'Детские клубы по возрастам' },
    { kind: 'budget', text: 'Без переплат и комиссий' },
  ];
  return (
    <div className="v1m hero-root">
      {/* Mobile top bar */}
      <div className="v1m__nav">
        <a href="tel:+74951234567" className="v1m__phone">
          <span className="v1m__pdot" />+7 495 123-45-67
        </a>
        <button className="v1m__menu" aria-label="меню">
          <span /><span /><span />
        </button>
      </div>

      {/* Photo */}
      <div className="v1m__media hero-media">
        <img src={H.img} alt="" />
        <div className="hero-media__dim" />
        <span className="hero-chip hero-chip--on-photo v1m__chip">
          <span className="hero-chip__dot" />
          Семейный отдых · с&nbsp;2012
        </span>
        <div className="hero-media__badge v1m__badge">Видео</div>
      </div>

      {/* Text panel */}
      <div className="v1m__text">
        <h1 className="hero-title v1m__title">
          Турция. Семейные отели<br />
          с <i>безупречным сервисом</i>.
        </h1>

        <ul className="v1m__bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <span className="v1m__bicon"><V1BulletIcon kind={b.kind} /></span>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>

        <button className="hero-cta v1m__cta">
          {H.cta}
          <svg className="hero-cta__arrow" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="v1m__hint">
          <b>от 89 900 ₽</b> · ответ за 15&nbsp;минут
        </div>
      </div>

      <style>{`
        .v1m { height: 100%; display: flex; flex-direction: column; background: var(--hero-bg); }

        .v1m__nav {
          height: 52px; flex-shrink: 0;
          padding: 0 18px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--hero-line);
        }
        .v1m__logo {
          display: flex; align-items: center; gap: 6px;
          font-weight: 800; font-size: 16px; letter-spacing: -0.02em;
          color: var(--hero-ink);
        }
        .v1m__logo i { font-style: normal; font-weight: 500; color: var(--hero-ink-soft); }
        .v1m__mark { color: var(--hero-accent); font-size: 18px; }
        .v1m__menu {
          width: 36px; height: 36px;
          background: transparent; border: 1px solid var(--hero-line);
          border-radius: 10px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; cursor: pointer;
        }
        .v1m__menu span { width: 14px; height: 1.6px; background: var(--hero-ink); border-radius: 2px; }
        .v1m__phone {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 700; color: var(--hero-ink);
          letter-spacing: -0.005em;
          text-decoration: none;
          padding: 8px 4px;
          margin: -8px -4px;
          -webkit-tap-highlight-color: rgba(46,190,174,0.2);
        }
        .v1m__phone:active { color: var(--hero-accent); }
        .v1m__pdot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #46c474;
          box-shadow: 0 0 0 3px rgba(70,196,116,.22);
        }

        .v1m__media {
          height: 320px; flex-shrink: 0;
          margin: 14px 14px 0;
          border-radius: 18px;
          box-shadow: 0 16px 30px rgba(14,27,26,0.18);
        }
        .v1m__chip {
          position: absolute; top: 14px; left: 14px;
          font-size: 10px; padding: 6px 10px;
        }
        .v1m__badge { right: 14px; top: 14px; bottom: auto; }

        .v1m__expert {
          position: absolute;
          left: 12px; right: 12px; bottom: 12px;
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px;
          background: rgba(255,255,255,0.94);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        .v1m__expert-ava {
          width: 32px; height: 32px;
          border-radius: 50%; overflow: hidden;
          border: 2px solid #fff; flex-shrink: 0;
        }
        .v1m__expert-ava img { width: 100%; height: 100%; object-fit: cover; }
        .v1m__expert-text { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
        .v1m__expert-text b {
          font-size: 11px; font-weight: 800; color: var(--hero-ink);
        }
        .v1m__expert-text span {
          font-size: 10px; font-weight: 500; color: var(--hero-ink-soft);
          letter-spacing: 0.01em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .v1m__text {
          flex: 1; min-height: 0;
          padding: 22px 18px 22px;
          display: flex; flex-direction: column;
          gap: 16px;
        }
        .v1m__title {
          font-size: 28px;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .v1m__title i {
          font-style: italic; font-weight: 800;
          background: linear-gradient(180deg, #1a3f3a 0%, #2EBEAE 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .v1m__bullets {
          list-style: none; margin: 0; padding: 0;
          display: grid; gap: 8px;
        }
        .v1m__bullets li {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 600; color: var(--hero-ink);
        }
        .v1m__bicon {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(46,190,174,0.10);
          color: var(--hero-accent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .v1m__bicon svg { width: 16px; height: 16px; }

        .v1m__cta {
          width: 100%; justify-content: center;
          padding: 16px; font-size: 13px;
          margin-top: 4px;
        }
        .v1m__hint {
          text-align: center;
          font-size: 11px; font-weight: 600;
          color: var(--hero-ink-soft);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .v1m__hint b { font-size: 13px; color: var(--hero-ink); }
      `}</style>
    </div>
  );
}

window.HeroV1Desktop = HeroV1Desktop;
window.HeroV1Mobile = HeroV1Mobile;
