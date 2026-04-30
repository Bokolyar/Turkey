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
        <section className="py-14 sm:py-20 md:py-24 bg-[var(--color-bg)] relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[var(--color-bg)] to-transparent"></div>

            <div className="container mx-auto">
                <div className="text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--color-text)] mb-6"
                    >
                        {data?.title || 'Отели, которые мы смело рекомендуем семьям'}
                    </motion.h2>
                    <p className="text-lg md:text-xl text-[var(--color-text)] opacity-70 font-medium">
                        {data?.subtitle || 'Список всегда формируется индивидуально под ваш запрос: возраст детей, даты и ваши пожелания.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-16">
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
                                className={`group flex flex-col bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-[2rem] overflow-hidden border border-[var(--color-card-border)] shadow-xl relative ${hotel.featured ? 'ring-2 ring-amber-400/50' : ''}`}
                            >
                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-30"></div>

                                <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
                                    {hotel.featured && (
                                        <div className="absolute top-5 right-5 z-20 bg-amber-400 text-amber-950 text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-[0.15em]">
                                            Хит продаж
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        src={imgSrc}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-6 left-6 z-20 pr-6">
                                        <div className="bg-teal-500/20 backdrop-blur-xl px-3 py-1 rounded-lg mb-2 inline-block border border-teal-400/30">
                                            <p className="text-teal-300 font-bold text-xs uppercase tracking-widest">{hotel.category}</p>
                                        </div>
                                        <h3 className="text-xl sm:text-3xl font-black text-white leading-none drop-shadow-2xl">{hotel.name}</h3>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-8 flex-1 flex flex-col relative">
                                    <p className="text-[var(--color-text)] opacity-80 mb-5 sm:mb-8 leading-relaxed flex-1 text-sm sm:text-base font-medium">
                                        {hotel.desc}
                                    </p>

                                    <div className="grid grid-cols-1 gap-3 mb-5 sm:mb-8">
                                        {hotel.features?.slice(0, 4).map((feat, i) => (
                                            <div key={i} className="flex items-center space-x-3 bg-teal-500/5 rounded-2xl p-3 border border-teal-500/10">
                                                <div className="bg-teal-500/20 p-1.5 rounded-lg flex-shrink-0">
                                                    <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                                </div>
                                                <span className="text-sm text-[var(--color-text)] font-bold opacity-90">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-teal-500/10 border border-teal-500/20 p-5 rounded-3xl mb-8 backdrop-blur-sm">
                                        <p className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1.5 opacity-60">Главный плюс</p>
                                        <p className="text-base text-[var(--color-text)] font-black leading-tight">{hotel.plus}</p>
                                    </div>

                                    <div className="mt-auto space-y-6">
                                        <div className="relative bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl px-5 py-4 italic text-sm text-[var(--color-text)] opacity-90 font-semibold leading-relaxed">
                                            «{hotel.quote}»
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={onQuoteClick}
                                            className="w-full py-5 rounded-2xl bg-teal-500 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-teal-400 transition-all flex items-center justify-center group/btn shadow-[0_15px_30px_-10px_rgba(20,184,166,0.6)]"
                                        >
                                            Узнать цену
                                            <ChevronRight className="w-6 h-6 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] border border-[var(--color-card-border)] p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl text-center max-w-5xl mx-auto"
                >
                    <p className="text-[var(--color-text)] opacity-80 leading-relaxed font-bold text-base md:text-lg">
                        <span className="text-teal-500 uppercase tracking-[0.2em] block mb-3 text-xs">Важное примечание</span>
                        Это лишь примеры из нашей базы в 150+ отелей. В итоговую подборку мы включим только лучшие варианты, подходящие под ваши критерии.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
