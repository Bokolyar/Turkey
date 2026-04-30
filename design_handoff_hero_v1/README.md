# Handoff: Sunturkey Hero V1 (Главный экран лендинга)

## Overview
Главный hero-экран лендинга Sunturkey — туроператор по семейному отдыху в Турции. Это первое, что видит пользователь: левая колонка с заголовком, буллетами и CTA на кремовом фоне; правая — фото-тизер с видео-плейсхолдером. Решает проблему предыдущей версии: текст не наезжает на лица людей на фото и не перегружен.

## About the Design Files
Файлы в этом пакете — **дизайн-референс, реализованный в HTML/JSX-прототипе** через React 18 + Babel-standalone в одном HTML. Это НЕ продакшн-код, который надо копировать как есть. Задача — **воссоздать этот дизайн в окружении вашей кодовой базы** (Next.js / Nuxt / Astro / etc.) с использованием существующих компонентов, токенов и паттернов. Если кодовой базы ещё нет — выберите подходящий фреймворк (рекомендуется Next.js + Tailwind или CSS-модули).

## Fidelity
**High-fidelity (hifi).** Точные цвета, типографика, отступы, состояния. Воссоздавайте пиксель-в-пиксель, заменяя только framework-специфику.

## Screens / Views

### 1. Desktop Hero (1440×900, адаптируется до full-bleed)
**Назначение:** первый экран лендинга, конверсия в заявку.

**Layout:**
- Корневой контейнер — `display: flex; flex-direction: column;` высотой 100% viewport (или min-height 720px).
- Сверху — навбар фиксированной высоты `64px`, `border-bottom: 1px solid #E5DDC9`.
- Под ним — двухколоночный grid `grid-template-columns: 1.05fr 1fr; gap: 0`.
- Левая колонка: padding `64px`, текст и CTA по центру вертикально.
- Правая колонка: фото-фрейм с `border-radius: 24px`, `margin: 24px 24px 24px 0`.

**Navbar:**
- Слева — навигация: «Подбор», «Курорты», «Отели», «О нас». Шрифт Manrope 600, 13px, `letter-spacing: 0.01em`. Цвет `#0E1B1A`. На hover → `#2EBEAE`.
- Справа — телефон `+7 495 123-45-67` (Manrope 700, 13px) с зелёной точкой online-индикатора (7×7px, `#46c474`, glow `0 0 0 3px rgba(70,196,116,.22)`).
- Между ссылками и телефоном — `flex: 1` для распорки.

**Левая колонка (текст):**
1. **Eyebrow chip** — пилюля `border-radius: 999px`, белая `rgba(255,255,255,0.92)`, текст «Семейный отдых · с 2012 · 14 лет», Manrope 700, 11px uppercase, `letter-spacing: 0.12em`. Внутри — бирюзовая точка 6×6px (`#2EBEAE`) с halo.
2. **H1** — Manrope 800, **60px**, `line-height: 1.02`, `letter-spacing: -0.03em`. Текст в 3 строки:
   ```
   Турция.
   Семейные отели
   с безупречным сервисом.
   ```
   Слова «безупречным сервисом» — italic 800 с **gradient-text** `linear-gradient(180deg, #1a3f3a 0%, #2EBEAE 100%)`, под ним декоративная подчёркивающая SVG-волна (`stroke: #2EBEAE`, opacity 0.5).
3. **Lead** — Manrope 500, 17px, цвет `#5C6A66`, `line-height: 1.5`, `max-width: 480px`. Текст: «Отбираем и тестируем отели с детьми сами — подскажем, где ребёнку правда хорошо.»
4. **Bullets** — три пункта, custom иконки в круглых бирюзовых badge'ах 28×28px:
   - 🏖 «Пологий песок и безопасные бухты»
   - 👶 «Детские клубы по возрастам — от 2 до 14»
   - 💳 «Подбор под бюджет — без переплат и комиссий»
   Текст Manrope 500, 14px, цвет `#0E1B1A`, gap между пунктами 10px.
5. **CTA-row** — горизонтальный flex, gap 20px:
   - Кнопка `.hero-cta`: фон `#F39237`, текст `#1B0E00`, padding `17px 26px`, `border-radius: 999px`, Manrope 800, 14px uppercase, `letter-spacing: 0.04em`. Текст «Получить подборку отелей» + arrow-icon. Shadow `0 12px 28px rgba(243,146,55,0.32)`. На hover — translateY(-1px) и усиление shadow.
   - Справа от кнопки: цена «от **89 900 ₽**» (Manrope 800, 16px, ink) + caption «/ за семью на 7 ночей» (12px, soft) + хинт «Бесплатно · ответ за 15 минут».
6. **Trust strip** — три метрики через вертикальные разделители 1×24px `#E5DDC9`:
   - **312** — отелей проверены лично
   - **9.6/10** — оценка наших семей
   - **4 200+** — семей отдохнули с нами
   Числа Manrope 800, 28px, `#0E1B1A`, `letter-spacing: -0.01em`. Подписи Manrope 600, 11px, `#5C6A66`, uppercase.

**Правая колонка (медиа):**
- Контейнер `border-radius: 24px`, `overflow: hidden`, `box-shadow: 0 30px 60px rgba(14,27,26,0.18)`.
- `<img>` с `object-fit: cover` (или `<video>` в проде).
- **Дим-градиент** сверху: `linear-gradient(180deg, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0.38) 100%)`.
- **Vertical caption** — слева снизу, повёрнутый `transform: rotate(-90deg)`, текст «Кемер · Beldibi Beach · июль 2025», Manrope 700, 10px uppercase, белый, с точкой-маркером.
- **Video badge** — справа сверху, плашка с blur-фоном `rgba(0,0,0,0.45)`, текст «Видео · 0:18» с пульсирующей красной точкой (animation 1.6s).

### 2. Mobile Hero (390×844)
**Layout:**
- `display: flex; flex-direction: column`, фон `#F7F4EE`.
- Навбар 52px, padding `0 18px`, `border-bottom: 1px solid #E5DDC9`. Содержит:
  - **Кликабельный телефон** — `<a href="tel:+74951234567">` с зелёной точкой и текстом, Manrope 700, 13px. На active цвет меняется на `#2EBEAE`. `padding: 8px 4px; margin: -8px -4px` для увеличенной hit-area, `-webkit-tap-highlight-color: rgba(46,190,174,0.2)`.
  - **Гамбургер** — кнопка 36×36, `border: 1px solid #E5DDC9`, `border-radius: 10px`, три полоски 14×1.6px.
- **Фото-блок** — высота 320px, `margin: 14px 14px 0`, `border-radius: 18px`. На фото:
  - Чип «Семейный отдых · с 2012» (стиль `.hero-chip--on-photo` — полупрозрачный белый с blur) — top-left.
  - Video badge «Видео» — top-right.
- **Текстовая панель** — flex: 1, padding `22px 18px`:
  - H1 28px, `line-height: 1.05`, в 2 строки:
    ```
    Турция. Семейные отели
    с безупречным сервисом.
    ```
    «безупречным сервисом» — italic с gradient-text.
  - Bullets (как на десктопе, но текст 13px).
  - CTA на всю ширину: `width: 100%; justify-content: center; padding: 15px`, font 12px.
  - Хинт под CTA: «**от 89 900 ₽** · ответ за 15 минут», 11px, `text-align: center`.

## Interactions & Behavior
- **CTA-кнопка** — open форму подбора (lead-форма / модалка).
- **Телефон в десктоп-навбаре** — `<a href="tel:+74951234567">` (рекомендуется обернуть в `<a>` тоже, сейчас в прототипе div).
- **Телефон в мобильном навбаре** — **уже кликабельный** `<a href="tel:+74951234567">` с tap-highlight.
- **Hover-состояния:**
  - Навигация: `color: #2EBEAE`, transition 150ms.
  - CTA: `transform: translateY(-1px)`, усиленный shadow.
- **Animations:**
  - Video badge — пульсация красной точки `@keyframes heroBlink` 1.6s infinite.
- **Адаптивность:** breakpoint ~ 900px — переключение на мобильную раскладку.

## State Management
Hero — статичен. Нужны только обработчики кликов на CTA и навигации. Никакого внутреннего состояния.

## Design Tokens

### Colors
| Токен | Hex | Использование |
|---|---|---|
| `--hero-bg` | `#F7F4EE` | Кремовый фон |
| `--hero-bg-deep` | `#EFE9DA` | Тёплый sand для фона канваса |
| `--hero-ink` | `#0E1B1A` | Основной текст, заголовки |
| `--hero-ink-soft` | `#5C6A66` | Вторичный текст, captions |
| `--hero-line` | `#E5DDC9` | Разделители, бордеры |
| `--hero-accent` | `#2EBEAE` | Бирюзовый акцент (точки, иконки, hover) |
| `--hero-cta` | `#F39237` | Оранжевая CTA-кнопка |
| `--hero-cta-ink` | `#1B0E00` | Текст на CTA |
| online-dot | `#46c474` | Зелёная точка online-индикатора |

### Typography
- **Family:** `Manrope`, fallback `system-ui, -apple-system, sans-serif`. Веса 400/500/600/700/800.
- **H1 desktop:** 60px / 1.02 / -0.03em / 800
- **H1 mobile:** 28px / 1.05 / -0.02em / 800
- **Lead:** 17px / 1.5 / 500
- **Bullets:** 14px (desktop) / 13px (mobile) / 1.4 / 500
- **CTA:** 14px / 800 uppercase / 0.04em
- **Eyebrow chip:** 11px / 700 uppercase / 0.12em
- **Trust num:** 28px / 800 / -0.01em
- **Trust caption:** 11px / 600 uppercase / 0.04em
- **Nav links:** 13px / 600 / 0.01em
- **Phone:** 13px / 700 / -0.005em

### Radii / Shadows
- `--hero-radius-lg`: 24px
- `--hero-radius-md`: 14px
- `--hero-radius-pill`: 999px
- Photo shadow: `0 30px 60px rgba(14,27,26,0.18)`
- CTA shadow: `0 12px 28px rgba(243,146,55,0.32)` → hover `0 16px 36px rgba(243,146,55,0.42)`
- Chip shadow: `0 6px 18px rgba(14,27,26,.08)`

### Spacing
Внешние padding'и левой колонки 64px, мобиле 18-22px. Gap между блоками 22-28px на десктопе, 14-16px на мобиле.

## Assets
- **Фото:** заглушка с Unsplash (`photo-1602002418082-...`), в проде — реальное видео/фото семьи на пляже (горизонтальный кроп, лица слева-снизу или по центру).
- **Иконки буллетов:** custom inline SVG (см. `V1BulletIcon` в `hero-v1-split.jsx`).
- **Шрифт Manrope:** Google Fonts.
- **Логотип:** **отсутствует** в текущем дизайне (намеренно убран).

## Files
В папке `source/`:
- **`hero-v1-split.jsx`** — главный компонент (`HeroV1Desktop`, `HeroV1Mobile`). Содержит и JSX, и inline `<style>` со всем CSS компонента.
- **`hero-data.jsx`** — копирайт и URL фото (вынесено для удобства редактирования).
- **`hero-shared.css`** — токены и общие классы (`.hero-cta`, `.hero-chip`, `.hero-media`, `.hero-bullets`, etc.).

Открой `preview.html` в браузере — там V1 рендерится без design-canvas, в чистом виде.

## Recommended Implementation Notes
1. **Вынеси токены в Tailwind config / CSS variables** на уровне приложения, а не компонента.
2. **Замени inline `<style>` на CSS-модули или Tailwind классы.**
3. **Telephone link:** оберни и десктопный телефон в `<a href="tel:...">` (в прототипе он `<div>`).
4. **Видео:** замени `<img>` на `<video autoPlay muted loop playsInline>` с poster.
5. **Accessibility:** добавь `aria-label` на гамбургер-меню (уже есть), на CTA-кнопку — `aria-describedby` со скрытым описанием цены.
6. **SEO:** H1 должен быть единственным на странице, проверить порядок landmarks (`<header>`, `<main>`).
