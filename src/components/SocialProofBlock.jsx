import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCheck, Clock, Calendar, Search, Headphones, Percent } from 'lucide-react';

export function SocialProofBlock() {
    const reviews = [
        {
            app: 'whatsapp',
            name: 'Елена (мама годовалого сына)',
            hotel: 'Crystal Family Resort',
            text: 'Очень переживала за ротавирус и питание для годовалого сына. Дарья посоветовала отель с жесточайшим контролем чистоты. В итоге: баночное питание в доступе 24/7, стерилизаторы в номере, а вход в море — чистейший песок. Мы впервые за три года по-настоящему выспались!! 🙏',
            time: '14:23',
        },
        {
            app: 'telegram',
            name: 'Семья Ивановых',
            hotel: 'AKKA Hotels Antedon',
            text: 'Раньше думали, что детский клуб — это просто комната с мультфильмами. В AKKA Antedon дети пропадали в клубе Toucan с утра до вечера: то они повара, то пираты, то сажают цветы. 🌺 Мы с мужем за 10 дней наконец-то сходили на ужин вдвоем. Спасибо Александре за этот подбор! 😍',
            time: '18:45',
        },
        {
            app: 'telegram',
            name: 'Алексей М.',
            hotel: 'Gloria Serenity Resort',
            text: 'Для нас был важен быстрый трансфер и качественный спорт. В Gloria Serenity всё на высоте. Доехали от аэропорта за 35 минут. Сын в восторге от футбольной академии, а мы — от уровня ресторанов. 🍷 Дорого, но каждая копейка оправдана качеством.',
            time: '11:10',
        }
    ];

    const triggers = [
        { val: '12+', text: 'лет создаем безупречные семейные воспоминания', icon: <Calendar className="w-6 h-6 text-sky-500 mb-2" /> },
        { val: '150+', text: 'отелей лично проинспектированы нашей командой', icon: <Search className="w-6 h-6 text-sky-500 mb-2" /> },
        { val: '24/7', text: 'поддержка — в WhatsApp на протяжении всего отпуска', icon: <Headphones className="w-6 h-6 text-sky-500 mb-2" /> },
        { val: '0%', text: 'переплат — вы платите цену туроператора', icon: <Percent className="w-6 h-6 text-sky-500 mb-2" /> },
    ];

    return (
        <section className="py-24 bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden">
            <div className="container max-w-6xl mx-auto px-4">

                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-[var(--color-text)] mb-6 leading-tight"
                    >
                        Истории идеального отпуска <span className="text-teal-500">от первого лица</span>
                    </motion.h2>
                    <p className="text-lg text-[var(--color-text)] opacity-60">
                        За каждым отзывом стоит работа эксперта и счастливое лето одной семьи.
                    </p>
                </div>

                {/* Chat Bubbles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {reviews.map((rev, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, type: "spring" }}
                            className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] p-6 rounded-[2.5rem] border border-[var(--color-card-border)] shadow-xl flex flex-col relative h-full group hover:border-teal-500/30 transition-all"
                        >
                            {/* Chat Header */}
                            <div className="flex items-center space-x-3 mb-6 border-b border-[var(--color-card-border)] pb-4">
                                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 font-black flex-shrink-0 shadow-lg shadow-teal-500/5">
                                    {rev.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-black text-[var(--color-text)] text-sm leading-tight">{rev.name}</p>
                                    <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest mt-1">онлайн</p>
                                </div>
                                <div className="ml-auto flex-shrink-0">
                                    {rev.app === 'whatsapp' ? (
                                        <div className="bg-green-500/10 text-green-500 text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest border border-green-500/20">WhatsApp</div>
                                    ) : (
                                        <div className="bg-blue-500/10 text-blue-500 text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest border border-blue-500/20">Telegram</div>
                                    )}
                                </div>
                            </div>

                            {/* Chat Bubble Context (Hotel name) */}
                            <div className="mb-4">
                                <span className="text-[9px] bg-white/5 text-[var(--color-text)] px-3 py-1 rounded-full uppercase tracking-widest font-black border border-[var(--color-card-border)] opacity-60">
                                    Отель: {rev.hotel}
                                </span>
                            </div>

                            {/* Message Bubble */}
                            <div className={`relative ${rev.app === 'whatsapp' ? 'bg-teal-500/10 border-teal-500/20' : 'bg-white/5 border-[var(--color-card-border)]'} p-5 rounded-[1.5rem] rounded-tl-none border shadow-sm mb-2 text-sm text-[var(--color-text)] leading-relaxed`}>
                                <div className={`absolute -left-2 top-0 w-4 h-4 ${rev.app === 'whatsapp' ? 'bg-teal-500/10' : 'bg-white/5'} border-l border-t border-[var(--color-card-border)] rotate-[-45deg] hidden`}></div>
                                <p className="font-medium opacity-90">{rev.text}</p>
                                <div className="flex justify-end items-center mt-4 space-x-1">
                                    <span className="text-[10px] text-[var(--color-text)] opacity-40 font-bold">{rev.time}</span>
                                    <CheckCheck className="w-3.5 h-3.5 text-teal-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Triggers Infographic */}
                <div className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-[3rem] p-8 md:p-12 shadow-2xl border border-[var(--color-card-border)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/10 transition-colors"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-[var(--color-card-border)]">
                        {triggers.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center px-4 py-4 md:py-0"
                            >
                                <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {React.cloneElement(item.icon, { className: "w-6 h-6 text-teal-500" })}
                                </div>
                                <div className="text-4xl font-black text-[var(--color-text)] mb-2 tracking-tighter">{item.val}</div>
                                <p className="text-xs text-[var(--color-text)] font-bold opacity-60 leading-snug uppercase tracking-widest">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
