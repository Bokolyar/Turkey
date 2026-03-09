import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

export function ComparisonBlock({ data }) {
    const comparisonData = [
        {
            label: 'Дорога и трансфер',
            mass: 'Изнурительный путь (2-3 часа) с заездами в десятки отелей по пути.',
            expert: 'Комфортная логистика. Выбираем отели вблизи аэропорта (30–60 мин) или организуем быстрый трансфер.',
        },
        {
            label: 'Детский клуб',
            mass: '«Комната с раскрасками». Один уставший аниматор на всех детей.',
            expert: 'Разделение по возрастам (0+, 4+, 8+, 12+). Профессиональные педагоги и развивающие программы.',
        },
        {
            label: 'Питание и сервис',
            mass: 'Очереди, шум в ресторане, меню из полуфабрикатов (фри/наггетсы).',
            expert: 'Детское кафе и здоровое меню. Свежие каши, баночное питание, блендеры и спокойная атмосфера.',
        },
        {
            label: 'Здоровье и гигиена',
            mass: 'Риск инфекций из-за переполненности и формальной очистки бассейнов.',
            expert: 'Строгий санитарный контроль. Ежедневная дезинфекция игровых зон и контроль качества воды 24/7.',
        },
        {
            label: 'Тишина и сон',
            mass: 'Шумная анимация под окнами номеров, мешающая дневному сну.',
            expert: 'Зонирование территории. Игровые зоны удалены от жилых корпусов для идеального сна малышей.',
        },
        {
            label: 'Забота о маме',
            mass: 'Платная аренда колясок, отсутствие элементарных вещей (стерилизаторов и т.д.)',
            expert: 'Всё под рукой. Коляски, горшки, радионяни и ванночки уже ждут вас в отеле.',
        }
    ];

    return (
        <section className="py-24 bg-[var(--color-bg)] relative overflow-hidden transition-colors duration-500">
            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)] mb-6 leading-tight whitespace-pre-wrap"
                    >
                        {data?.title || 'Не все All Inclusive одинаково полезны'}
                    </motion.h2>
                    <p className="text-lg text-[var(--color-text)] opacity-70">
                        Мы не просто бронируем отель, мы проектируем ваш комфорт. Посмотрите, из чего складывается разница между «просто отпуском» и отдыхом, где продумана каждая деталь.
                    </p>
                </div>

                <div className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-3xl shadow-2xl border border-[var(--color-card-border)] overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white/5 border-b border-[var(--color-card-border)]">
                        <div className="hidden md:block p-6"></div>
                        <div className="p-6 text-center border-b md:border-b-0 md:border-r border-[var(--color-card-border)] bg-red-500/5 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-red-500 whitespace-pre-wrap uppercase tracking-widest text-[10px] sm:text-lg">{data?.col1Title || 'Масс-маркет 5*'}</h3>
                        </div>
                        <div className="p-6 text-center bg-teal-500/10 shadow-inner relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-12 h-12 bg-teal-500 rounded-bl-full shadow-md z-0 flex items-start justify-end p-2 text-white font-black">★</div>
                            <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 relative z-10 whitespace-pre-wrap uppercase tracking-widest text-[10px] sm:text-lg">{data?.col2Title || 'Наш экспертный выбор'}</h3>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-[var(--color-card-border)]">
                        {comparisonData.map((row, idx) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="grid grid-cols-1 md:grid-cols-3 hover:bg-white/5 transition-colors group"
                            >
                                <div className="p-6 md:p-8 flex items-center md:border-r border-[var(--color-card-border)] bg-white/5">
                                    <h4 className="text-sm font-black text-[var(--color-text)] uppercase tracking-wider">{row.label}</h4>
                                </div>
                                <div className="p-6 md:p-8 md:border-r border-[var(--color-card-border)] flex items-start space-x-4">
                                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-[var(--color-text)] opacity-60 text-sm leading-relaxed">{row.mass}</p>
                                </div>
                                <div className="p-6 md:p-8 flex items-start space-x-4 bg-teal-500/5 group-hover:bg-teal-500/10 transition-colors">
                                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-[var(--color-text)] font-bold text-sm leading-relaxed">{row.expert}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-3xl p-8 border border-[var(--color-card-border)] shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="text-xl font-black text-[var(--color-text)] mb-3 block border-l-4 border-red-500 pl-4 uppercase tracking-tighter">Случайные варианты исключены</h4>
                        <p className="text-[var(--color-text)] opacity-70 text-sm leading-relaxed relative z-10">
                            За 12 лет работы мы сформировали базу отелей, которые не подводят. Мы не предлагаем варианты, где за красивым фасадом скрывается плохой сервис или антисанитария.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-3xl p-8 border border-[var(--color-card-border)] shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="text-xl font-black text-[var(--color-text)] mb-3 block border-l-4 border-teal-500 pl-4 uppercase tracking-tighter">Отдых для всей семьи</h4>
                        <p className="text-[var(--color-text)] opacity-70 text-sm leading-relaxed relative z-10">
                            Мы выбираем концепции, где инфраструктура позволяет родителям расслабиться в Zen-зоне или заняться спортом, пока дети увлечены в клубе.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
