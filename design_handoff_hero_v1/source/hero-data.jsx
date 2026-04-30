// Shared content for all hero variations.
// Real photo URLs (Unsplash) — family-on-beach scenes with usable composition.

const HERO_IMG_FAMILY = "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=80";
const HERO_IMG_BEACH = "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80";
const HERO_IMG_POOL = "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80";

// Slogan reduction: from 16-word title to 3-4 words.
const HERO = {
  chip: "Специализируемся на семейном отдыхе в Турции с 2012 года",
  // Short variants — different emphasis per option
  titleA: "Семейная Турция,\nпроверенная лично",
  titleB: "Турция 2026.\nС детьми — спокойно",
  titleC: "Лично проверенные\nотели для семей",
  titleD: "Турция для своих",
  bullets: [
    "Пологий песок и безопасные бухты",
    "Детские клубы по возрастам",
    "Подбор под бюджет — без переплат",
  ],
  cta: "Получить подборку отелей",
  hint: "Бесплатно · ответ за 15 минут",
  img: HERO_IMG_FAMILY,
  imgBeach: HERO_IMG_BEACH,
  imgPool: HERO_IMG_POOL,
};

window.HERO = HERO;
