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
        <section className="py-24 bg-[var(--color-bg)] relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[var(--color-bg)] to-transparent"></div>

            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)] mb-6 leading-tight"
                    >
                        {data?.title || 'Отели, которые мы смело рекомендуем семьям'}
                    </motion.h2>
                    <p className="text-lg text-[var(--color-text)] opacity-70">
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
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                key={hotel.id || idx}
                                className={`group flex flex-col bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-3xl overflow-hidden border border-[var(--color-card-border)] shadow-xl relative ${hotel.featured ? 'ring-2 ring-amber-400/50' : ''}`}
                            >
                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-30"></div>

                                <div className="relative h-64 overflow-hidden">
                                    {hotel.featured && (
                                        <div className="absolute top-4 right-4 z-20 bg-amber-400 text-amber-950 text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                                            Хит продаж
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        src={imgSrc}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className="bg-sky-500/20 backdrop-blur-md px-2 py-0.5 rounded-lg mb-1 inline-block border border-sky-400/30">
                                            <p className="text-sky-300 font-bold text-[10px] uppercase tracking-wider">{hotel.category}</p>
                                        </div>
                                        <h3 className="text-2xl font-black text-white leading-tight drop-shadow-md">{hotel.name}</h3>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col relative">
                                    <p className="text-[var(--color-text)] opacity-80 mb-6 leading-relaxed flex-1 text-sm font-medium">
                                        {hotel.desc}
                                    </p>

                                    <div className="grid grid-cols-1 gap-3 mb-6">
                                        {hotel.features?.map((feat, i) => (
                                            <div key={i} className="flex items-center space-x-3 bg-white/5 rounded-xl p-2 border border-white/5">
                                                <div className="bg-teal-500/20 p-1 rounded-lg">
                                                    <Check className="w-3.5 h-3.5 text-teal-500" />
                                                </div>
                                                <span className="text-xs text-[var(--color-text)] font-semibold opacity-90">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-teal-500/5 border border-teal-500/10 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                                        <p className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">Главный плюс</p>
                                        <p className="text-sm text-[var(--color-text)] font-bold">{hotel.plus}</p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="relative bg-amber-500/5 border-l-4 border-amber-500 rounded-r-xl px-4 py-3 mb-6 italic text-sm text-[var(--color-text)] opacity-90 font-medium">
                                            «{hotel.quote}»
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={onQuoteClick}
                                            className="w-full py-4 rounded-2xl bg-teal-500 text-white font-black text-sm uppercase tracking-widest hover:bg-teal-400 transition-all flex items-center justify-center group/btn shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)]"
                                        >
                                            Узнать цену
                                            <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    whileInView={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] border border-[var(--color-card-border)] p-8 rounded-3xl shadow-2xl text-center max-w-4xl mx-auto"
                >
                    <p className="text-[var(--color-text)] opacity-70 leading-relaxed font-medium">
                        <span className="font-black text-teal-500 uppercase tracking-widest mr-2">Важно:</span>
                        Это лишь примеры из нашей базы в 150+ отелей. В итоговую подборку мы включим только лучшие варианты, подходящие под ваши критерии.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
