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
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight whitespace-pre-wrap"
                    >
                        {data?.title || 'Не все All Inclusive одинаково полезны'}
                    </motion.h2>
                    <p className="text-lg text-slate-600">
                        Мы не просто бронируем отель, мы проектируем ваш комфорт. Посмотрите, из чего складывается разница между «просто отпуском» и отдыхом, где продумана каждая деталь.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-50 border-b border-slate-200">
                        <div className="hidden md:block p-6"></div>
                        <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200 bg-red-50/50 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-red-600 whitespace-pre-wrap">{data?.col1Title || 'Масс-маркет 5*'}</h3>
                        </div>
                        <div className="p-6 text-center bg-sky-50 shadow-inner relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-bl-full shadow-md z-0 flex items-start justify-end p-3 text-white">★</div>
                            <h3 className="text-xl font-bold text-sky-700 relative z-10 whitespace-pre-wrap">{data?.col2Title || 'Наш экспертный выбор'}</h3>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-100">
                        {comparisonData.map((row, idx) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="grid grid-cols-1 md:grid-cols-3 hover:bg-slate-50/50 transition-colors"
                            >
                                <div className="p-6 md:p-8 flex items-center md:border-r border-slate-100">
                                    <h4 className="text-lg font-bold text-slate-800">{row.label}</h4>
                                </div>
                                <div className="p-6 md:p-8 md:border-r border-slate-100 flex items-start space-x-4">
                                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-600 leading-relaxed">{row.mass}</p>
                                </div>
                                <div className="p-6 md:p-8 flex items-start space-x-4 bg-sky-50/30">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-800 font-medium leading-relaxed">{row.expert}</p>
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
                        className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
                    >
                        <h4 className="text-xl font-bold text-slate-800 mb-3 block border-l-4 border-amber-400 pl-4">Мы исключаем «случайные» варианты</h4>
                        <p className="text-slate-600 leading-relaxed">
                            За 12 лет работы мы сформировали базу отелей, которые не подводят. Мы не предлагаем варианты, где за красивым фасадом скрывается плохой сервис или антисанитария. Ваша безопасность и спокойствие — наш приоритет.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-sky-50 rounded-2xl p-8 border border-sky-100"
                    >
                        <h4 className="text-xl font-bold text-sky-900 mb-3 block border-l-4 border-sky-500 pl-4">Отдых, где родители тоже отдыхают</h4>
                        <p className="text-sky-800 leading-relaxed">
                            Мы выбираем концепции (такие как Toucan и аналоги), где инфраструктура позволяет родителям расслабиться в Zen-зоне или заняться спортом, пока дети увлечены в клубе под присмотром профессионалов.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
