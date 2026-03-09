import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import crystalImg from '../assets/crystal_family.png';
import akkaImg from '../assets/akka_antedon.png';
import gloriaImg from '../assets/gloria_serenity.png';

const fallbackImages = {
    crystal: crystalImg,
    akka: akkaImg,
    gloria: gloriaImg
};

export function ExpertPicksBlock({ data, onQuoteClick }) {
    const hotels = data?.hotels || [];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-slate-50"></div>

            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
                    >
                        {data?.title || 'Отели, которые мы смело рекомендуем семьям'}
                    </motion.h2>
                    <p className="text-lg text-slate-600">
                        {data?.subtitle || 'Список всегда формируется индивидуально под ваш запрос: возраст детей, даты и ваши пожелания.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {hotels.map((hotel, idx) => {
                        const imgSrc = hotel.image?.startsWith('http')
                            ? hotel.image
                            : (hotel.image?.includes('.')
                                ? `/api/uploads/${hotel.image}`
                                : fallbackImages[hotel.id] || fallbackImages.crystal);

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                key={hotel.id || idx}
                                className={`flex flex-col bg-white rounded-3xl overflow-hidden border shadow-xl transition-all duration-300 hover:-translate-y-2 ${hotel.featured ? 'border-amber-400 ring-4 ring-amber-400/20' : 'border-slate-100 hover:shadow-2xl'}`}
                            >
                                <div className="relative h-64 overflow-hidden group">
                                    {hotel.featured && (
                                        <div className="absolute top-4 right-4 z-20 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                                            Хит продаж
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                                    <img
                                        src={imgSrc}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <p className="text-sky-300 font-semibold text-sm mb-1">{hotel.category}</p>
                                        <h3 className="text-2xl font-bold text-white leading-tight">{hotel.name}</h3>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                                        {hotel.desc}
                                    </p>

                                    <ul className="space-y-3 mb-6">
                                        {hotel.features?.map((feat, i) => (
                                            <li key={i} className="flex items-start">
                                                <Check className="w-5 h-5 text-sky-500 mr-3 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-slate-700">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-sky-50 p-4 rounded-xl mb-6">
                                        <p className="text-sm font-semibold text-sky-900 mb-1">Главный плюс:</p>
                                        <p className="text-sm text-sky-800">{hotel.plus}</p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="relative border-l-4 border-amber-400 pl-4 py-1 mb-6">
                                            <p className="text-sm italic text-slate-600">
                                                «{hotel.quote}»
                                            </p>
                                        </div>
                                        <button
                                            onClick={onQuoteClick}
                                            className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 transition-colors flex items-center justify-center group"
                                        >
                                            Узнать цену на мои даты
                                            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm text-center max-w-4xl mx-auto">
                    <p className="text-slate-600 leading-relaxed">
                        <span className="font-bold text-slate-800">Важно:</span> Это лишь примеры из нашей базы в 150+ отелей. В итоговую подборку для вас мы включим только те варианты, которые свободны на ваши даты и на 100% подходят под возраст ваших детей и ваши привычки в отдыхе.
                    </p>
                </div>
            </div>
        </section>
    );
}
