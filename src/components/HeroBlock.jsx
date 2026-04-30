import React from 'react';
import { motion } from 'framer-motion';

const bulletIcons = {
    beach: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M5 18c1.5-2 4-3 7-3s5.5 1 7 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="17" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M17 8l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    kids: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9.5 8.5c.5.5 1.4.8 2.5.8s2-.3 2.5-.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    ),
    budget: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3.5" y="6.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6.5 12h.5M17 12h.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    gift: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="4" y="11" width="16" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 11v9" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="8" width="18" height="3" rx="1" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 8c0-2.5-2-4-3.5-4S6 5 7.5 6.5 12 8 12 8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8c0-2.5 2-4 3.5-4S18 5 16.5 6.5 12 8 12 8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

const bulletKinds = ['beach', 'kids', 'budget', 'gift'];

const trustItems = [
    { num: '312', cap: <>отелей<br/>проверены лично</> },
    { num: <>9.6<i>/10</i></>, cap: <>оценка<br/>наших семей</> },
    { num: '4 200+', cap: <>семей отдохнули<br/>с&nbsp;нами</> },
];

const navLinks = [
    { label: 'Подбор', to: 'quiz' },
    { label: 'Отели', to: 'hotels' },
    { label: 'Отзывы', to: 'reviews' },
    { label: 'Вопросы', to: 'faq' },
];

function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = window.matchMedia('(max-width: 720px)').matches ? 56 : 64;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
}

function resolveImg(bgImage) {
    if (!bgImage) return '/assets/hero_family_resort.png';
    if (bgImage.startsWith('http')) return bgImage;
    if (bgImage.includes('.')) return `/api/uploads/${bgImage}`;
    return `/assets/${bgImage}`;
}

export function HeroBlock({ data, onQuizClick }) {
    const subtitle = data?.subtitle || 'Семейный отдых · с 2012';
    const desc = data?.desc;
    const buttonText = data?.buttonText || 'Получить подборку отелей';

    const triggers = data?.triggers || [];
    const bullets = triggers.map((t, i) => ({
        kind: bulletKinds[i % bulletKinds.length],
        text: t.text,
    }));

    const imgSrc = resolveImg(data?.bgImage);

    return (
        <section className="hv1">
            <style>{heroStyles}</style>

            {/* Navbar */}
            <div className="hv1nav">
                <nav className="hv1nav__links">
                    {navLinks.map((l) => (
                        <a
                            key={l.label}
                            onClick={() => l.to === 'quiz' ? onQuizClick() : scrollToId(l.to)}
                        >{l.label}</a>
                    ))}
                </nav>
                <a href="tel:+74951234567" className="hv1nav__phone">
                    <span className="hv1nav__pdot" />
                    +7 495 123-45-67
                </a>
            </div>

            {/* Mobile top photo */}
            <div className="hv1m-media-wrap">
                <div className="hv1-media">
                    <img src={imgSrc} alt="Семейный отдых в Турции" />
                    <div className="hv1-media__dim" />
                    <span className="hv1-chip hv1-chip--on-photo">
                        <span className="hv1-chip__dot" />
                        {subtitle}
                    </span>
                    <div className="hv1-media__badge">Видео</div>
                </div>
            </div>

            {/* Two-column grid */}
            <div className="hv1__grid">
                {/* LEFT — text */}
                <div className="hv1__text">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="hv1-chip hv1__chip"
                    >
                        <span className="hv1-chip__dot" />
                        {subtitle}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="hv1__title"
                    >
                        <span className="hv1__title-line">Турция. Семейные отели</span>
                        <span className="hv1__title-line">с <span className="hv1__title-accent">безупречным сервисом</span>.</span>
                    </motion.h1>

                    {desc && (
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12 }}
                            className="hv1__lede"
                        >
                            {desc}
                        </motion.p>
                    )}

                    {bullets.length > 0 && (
                        <ul className="hv1__bullets">
                            {bullets.map((b, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: 0.18 + i * 0.06 }}
                                >
                                    <span className="hv1__bicon">{bulletIcons[b.kind]}</span>
                                    <span>{b.text}</span>
                                </motion.li>
                            ))}
                        </ul>
                    )}

                    <div className="hv1__cta-row">
                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onQuizClick}
                            className="hv1__cta"
                            type="button"
                        >
                            <span>{buttonText}</span>
                            <svg className="hv1__cta-arrow" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>
                        <div className="hv1__cta-meta">
                            <div className="hv1__price">
                                от <b>89&thinsp;900&nbsp;₽</b>
                            </div>

                        </div>
                    </div>

                    <div className="hv1__trust">
                        {trustItems.map((t, i) => (
                            <React.Fragment key={i}>
                                <div className="hv1__trust-item">
                                    <span className="hv1__trust-num">{t.num}</span>
                                    <span className="hv1__trust-cap">{t.cap}</span>
                                </div>
                                {i < trustItems.length - 1 && <span className="hv1__trust-div" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* RIGHT — photo */}
                <div className="hv1__media-wrap">
                    <div className="hv1-media hv1__media">
                        <img src={imgSrc} alt="Семейный отдых в Турции" />
                        <div className="hv1-media__dim" />
                        <div className="hv1__caption">
                            <span className="hv1__caption-dot" />
                            Кемер · Beldibi Beach · июль&nbsp;2025
                        </div>
                        <div className="hv1-media__badge">Видео · 0:18</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const heroStyles = `
.hv1 {
    --hv1-ink-soft: rgba(14, 27, 26, 0.62);
    --hv1-line: rgba(14, 27, 26, 0.12);
    --hv1-accent: #2EBEAE;
    --hv1-cta: #F39237;
    --hv1-cta-ink: #1B0E00;
    --hv1-nav-bg: rgba(255, 255, 255, 0.78);

    font-family: 'Manrope', system-ui, -apple-system, sans-serif;
    color: var(--color-text);
    background: var(--color-bg);
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    padding-top: 64px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.dark .hv1 {
    --hv1-ink-soft: rgba(248, 250, 252, 0.7);
    --hv1-line: rgba(248, 250, 252, 0.14);
    --hv1-nav-bg: rgba(15, 23, 42, 0.78);
}
.hv1 *, .hv1 *::before, .hv1 *::after { box-sizing: border-box; }

/* Navbar — fixed across page */
.hv1nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    height: 64px;
    padding: 0 96px 0 40px;
    display: flex;
    align-items: center;
    gap: 40px;
    border-bottom: 1px solid var(--hv1-line);
    background: var(--hv1-nav-bg);
    -webkit-backdrop-filter: saturate(140%) blur(14px);
    backdrop-filter: saturate(140%) blur(14px);
}
.hv1nav__links {
    display: flex;
    gap: 28px;
    flex: 1;
    flex-wrap: wrap;
}
.hv1nav__links a {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text);
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: color .15s ease;
}
.hv1nav__links a:hover { color: var(--hv1-accent); }
.hv1nav__phone {
    font-size: 13px;
    font-weight: 700;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    letter-spacing: -0.005em;
}
.hv1nav__phone:hover { color: var(--hv1-accent); }
.hv1nav__pdot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #46c474;
    box-shadow: 0 0 0 3px rgba(70,196,116,.22);
}

/* Mobile-only top photo */
.hv1m-media-wrap { display: none; }

/* Grid */
.hv1__grid {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: 1.05fr 1fr;
}

/* Text column */
.hv1__text {
    padding: 56px 56px 48px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    max-width: 720px;
}
.hv1__chip { align-self: flex-start; }

/* Eyebrow chip */
.hv1-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 8px 14px 8px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.92);
    color: #0E1B1A;
    border: 1px solid rgba(14,27,26,0.06);
    box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 6px 18px rgba(14,27,26,.08);
}
.hv1-chip__dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--hv1-accent);
    box-shadow: 0 0 0 3px rgba(46,190,174,0.2);
    flex-shrink: 0;
}
.hv1-chip--on-photo {
    background: rgba(255,255,255,0.16);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.28);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.18);
}

/* Title */
.hv1__title {
    font-size: clamp(28px, 3.6vw, 48px);
    line-height: 1.06;
    letter-spacing: -0.02em;
    font-weight: 800;
    margin: 0;
    color: var(--color-text);
}
.hv1__title-line {
    display: block;
}
@media (min-width: 1024px) {
    .hv1__title-line { white-space: nowrap; }
}
.hv1__title-accent {
    font-style: italic;
    font-weight: 800;
    background: linear-gradient(180deg, #1a3f3a 0%, #2EBEAE 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    padding: 0 4px;
    white-space: nowrap;
}
.hv1__title-accent::after {
    content: "";
    position: absolute;
    left: 4px; right: 4px; bottom: 4px;
    height: 6px;
    background: rgba(46,190,174,0.22);
    z-index: -1;
    border-radius: 2px;
}

/* Lead */
.hv1__lede {
    margin: 0;
    font-size: 17px;
    line-height: 1.5;
    color: var(--hv1-ink-soft);
    font-weight: 500;
    max-width: 520px;
    text-wrap: pretty;
}

/* Bullets */
.hv1__bullets {
    list-style: none;
    margin: 4px 0 0;
    padding: 0;
    display: grid;
    gap: 12px;
}
.hv1__bullets li {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.4;
}
.hv1__bicon {
    flex-shrink: 0;
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(46,190,174,0.10);
    color: var(--hv1-accent);
    display: flex;
    align-items: center;
    justify-content: center;
}
.hv1__bicon svg { width: 20px; height: 20px; }

/* CTA row */
.hv1__cta-row {
    display: flex;
    align-items: center;
    gap: 22px;
    margin-top: 8px;
    flex-wrap: wrap;
}
.hv1__cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    appearance: none;
    border: 0;
    font-family: inherit;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: var(--hv1-cta);
    color: var(--hv1-cta-ink);
    padding: 17px 26px;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: 0 1px 0 rgba(255,255,255,0.4) inset, 0 12px 28px rgba(243,146,55,0.32);
    transition: box-shadow .2s ease;
    text-align: left;
    line-height: 1.2;
}
.hv1__cta:hover {
    box-shadow: 0 1px 0 rgba(255,255,255,0.4) inset, 0 16px 36px rgba(243,146,55,0.42);
}
.hv1__cta-arrow { width: 18px; height: 18px; flex-shrink: 0; }

.hv1__cta-meta { display: flex; flex-direction: column; gap: 4px; }
.hv1__price {
    font-size: 13px;
    color: var(--hv1-ink-soft);
    font-weight: 500;
}
.hv1__price b {
    font-weight: 800;
    color: var(--color-text);
    font-size: 16px;
    letter-spacing: -0.01em;
}
.hv1__price span { font-size: 12px; }
.hv1__hint {
    font-size: 11px;
    font-weight: 600;
    color: var(--hv1-ink-soft);
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

/* Trust strip */
.hv1__trust {
    margin-top: auto;
    padding-top: 28px;
    border-top: 1px solid var(--hv1-line);
    display: flex;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
}
.hv1__trust-item { display: flex; flex-direction: column; gap: 4px; }
.hv1__trust-num {
    font-size: 26px;
    font-weight: 800;
    color: var(--color-text);
    letter-spacing: -0.02em;
    line-height: 1;
}
.hv1__trust-num i {
    font-style: normal;
    font-size: 16px;
    font-weight: 600;
    color: var(--hv1-ink-soft);
}
.hv1__trust-cap {
    font-size: 11px;
    font-weight: 500;
    color: var(--hv1-ink-soft);
    line-height: 1.3;
    letter-spacing: 0.01em;
    text-transform: uppercase;
}
.hv1__trust-div {
    width: 1px;
    height: 38px;
    background: var(--hv1-line);
}

/* Media (right column) */
.hv1__media-wrap {
    padding: 24px 24px 24px 0;
    display: flex;
    min-height: 0;
}
.hv1-media {
    position: relative;
    overflow: hidden;
    background: #1a1f1e;
    border-radius: 20px;
    flex: 1;
    min-width: 0;
    box-shadow: 0 30px 60px rgba(14,27,26,0.18), 0 8px 20px rgba(14,27,26,0.10);
}
.hv1-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.hv1-media__dim {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0.38) 100%);
    pointer-events: none;
}
.hv1-media__badge {
    position: absolute;
    right: 18px;
    top: 18px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    background: rgba(0,0,0,0.45);
    border-radius: 999px;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
}
.hv1-media__badge::before {
    content: "";
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #ff5252;
    animation: hv1Blink 1.6s infinite;
}
@keyframes hv1Blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.hv1__caption {
    position: absolute;
    left: 18px;
    top: 18px;
    padding: 7px 11px;
    background: rgba(255,255,255,0.16);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.28);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 7px;
}
.hv1__caption-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #fff;
}

/* ── Tablet/Mobile ── */
@media (max-width: 1024px) {
    .hv1__grid { grid-template-columns: 1fr; }
    .hv1__media-wrap { padding: 0 16px 16px; order: 2; }
    .hv1__text { order: 1; padding: 32px 24px 28px; gap: 18px; max-width: none; }
    .hv1-media { min-height: 360px; }
}

@media (max-width: 720px) {
    .hv1 { padding-top: 56px; }
    .hv1nav { height: 56px; padding: 0 72px 0 18px; gap: 16px; }
    .hv1nav__links { display: none; }
    .hv1nav__phone { font-size: 13px; }

    .hv1__grid { display: flex; flex-direction: column; }

    /* Hide right-column media on small mobile, show top media instead */
    .hv1__media-wrap { display: none; }
    .hv1m-media-wrap {
        display: block;
        padding: 14px 14px 0;
    }
    .hv1m-media-wrap .hv1-media {
        height: 300px;
        border-radius: 18px;
        box-shadow: 0 16px 30px rgba(14,27,26,0.18);
    }
    .hv1m-media-wrap .hv1-chip--on-photo {
        position: absolute;
        top: 14px; left: 14px;
        font-size: 10px;
        padding: 6px 10px;
    }
    .hv1m-media-wrap .hv1-media__badge { right: 14px; top: 14px; }

    .hv1__text {
        padding: 22px 18px 24px;
        gap: 16px;
    }
    .hv1__chip { display: none; }
    .hv1__title { font-size: 28px; line-height: 1.05; letter-spacing: -0.02em; }
    .hv1__lede { font-size: 15px; line-height: 1.45; }
    .hv1__bullets li { font-size: 13px; gap: 10px; }
    .hv1__bicon { width: 28px; height: 28px; border-radius: 8px; }
    .hv1__bicon svg { width: 16px; height: 16px; }

    .hv1__cta-row { flex-direction: column; align-items: stretch; gap: 12px; }
    .hv1__cta {
        width: 100%;
        justify-content: center;
        padding: 16px;
        font-size: 13px;
    }
    .hv1__cta-meta { align-items: center; text-align: center; }

    .hv1__trust { gap: 16px; padding-top: 20px; }
    .hv1__trust-num { font-size: 22px; }
    .hv1__trust-num i { font-size: 14px; }
    .hv1__trust-div { height: 32px; }
}
`;
