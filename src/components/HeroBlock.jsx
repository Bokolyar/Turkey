import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Percent, ThumbsUp, Baby } from 'lucide-react';
import heroBg from '../assets/hero_family_resort.png';

export function HeroBlock({ onQuizClick }) {
    const triggers = [
        { icon: <ShieldCheck className="w-5 h-5 text-sky-500" />, text: "Гарантия цены: Платите за реальное качество, а не за бренд." },
        { icon: <Percent className="w-5 h-5 text-sky-500" />, text: "Скидка: Раннее бронирование: выгода до 45%." },
        { icon: <ThumbsUp className="w-5 h-5 text-sky-500" />, text: "Надежность: Только проверенные туроператоры." },
        { icon: <Baby className="w-5 h-5 text-sky-500" />, text: "Акция: \"дети до 12 лет отдыхают бесплатно\"" },
    ];

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Move the image downwards as we scroll down to create parallax
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    // Also scale the image slightly as we scroll down
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

    return (
        <section ref={ref} className="relative h-[100svh] flex items-center pt-4 pb-4 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 tracking-tighter">
                <motion.img
                    style={{ y, scale }}
                    src={heroBg}
                    alt="Счастливая семья на отдыхе в отеле Турции с песчаным пляжем и соснами"
                    className="w-full h-full object-cover object-center scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent"></div>
            </div>

            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sky-400 font-semibold tracking-wide uppercase text-xs sm:text-sm mb-2">
                            Специализируемся на семейном отдыхе в Турции с 2012 года
                        </p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 tracking-tight">
                            Турция 2026: Отели с безупречным сервисом и детскими клубами, <span className="text-sky-400">проверенные нами лично</span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-200 mb-5 leading-relaxed max-w-xl">
                            Подберем идеальный вариант под ваш бюджет: с пологим песчаным входом,
                            качественным меню и активностями для детей любого возраста. Без переплат
                            за «картинку» — только реальное качество и безопасность.
                        </p>

                        {/* CTA Button */}
                        <div className="mb-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onQuizClick}
                                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white bg-amber-500 rounded-full shadow-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 overflow-hidden transition-colors"
                            >
                                <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-12 group-hover:block transition-all ease-out duration-500 -translate-x-full group-hover:translate-x-full animate-[shimmer_2s_infinite]"></div>
                                Получить подборку отелей для идеального отдыха
                            </motion.button>
                            <p className="mt-2 text-xs sm:text-sm text-slate-300 ml-4 border-l-2 border-sky-400 pl-3">
                                Пройдите тест и получите чек-лист <br />«Что взять с собой в Турцию с детьми»
                            </p>
                        </div>

                        {/* Feature Triggers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {triggers.map((trigger, idx) => (
                                <div key={idx} className="flex items-start space-x-2 sm:space-x-3 bg-slate-900/40 backdrop-blur-md p-2 sm:p-3 rounded-xl border border-white/10">
                                    <div className="flex-shrink-0 mt-0.5">
                                        {trigger.icon}
                                    </div>
                                    <p className="text-sm text-slate-200 leading-snug">
                                        {trigger.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
                onClick={onQuizClick}
            >
                <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center p-1 backdrop-blur-sm bg-slate-900/20">
                    <motion.div
                        animate={{
                            y: [0, 16, 0],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                        className="w-1.5 h-1.5 bg-white rounded-full mt-1"
                    />
                </div>
            </motion.div>
        </section>
    );
}
