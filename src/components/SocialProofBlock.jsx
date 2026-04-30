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
        <section className="py-14 sm:py-20 md:py-24 bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto">

                <div className="text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--color-text)] mb-6"
                    >
                        Истории идеального отпуска <span className="text-teal-500">от первого лица</span>
                    </motion.h2>
                    <p className="text-lg md:text-xl text-[var(--color-text)] opacity-60 font-medium">
                        За каждым отзывом стоит работа эксперта и счастливое лето одной семьи.
                    </p>
                </div>

                {/* Chat Bubbles */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8 mb-12 sm:mb-20">
                    {reviews.map((rev, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, type: "spring" }}
                            className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-[var(--color-card-border)] shadow-xl flex flex-col relative h-full group hover:border-teal-500/30 transition-all"
                        >
                            {/* Chat Header */}
                            <div className="flex items-center space-x-3 mb-6 border-b border-[var(--color-card-border)] pb-4">
                                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-extrabold flex-shrink-0 shadow-lg shadow-teal-500/5">
                                    {rev.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-black text-[var(--color-text)] text-sm sm:text-base leading-tight">{rev.name}</p>
                                    <p className="text-[10px] text-teal-500 font-black uppercase tracking-[0.2em] mt-1 shrink-0">онлайн</p>
                                </div>
                                <div className="ml-auto flex-shrink-0">
                                    {rev.app === 'whatsapp' ? (
                                        <div className="bg-green-500/10 text-green-500 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-green-500/20">WhatsApp</div>
                                    ) : (
                                        <div className="bg-blue-500/10 text-blue-500 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-blue-500/20">Telegram</div>
                                    )}
                                </div>
                            </div>

                            {/* Context (Hotel name) */}
                            <div className="mb-6">
                                <span className="text-[10px] bg-white/5 text-[var(--color-text)] px-4 py-1.5 rounded-full uppercase tracking-[0.15em] font-black border border-[var(--color-card-border)] opacity-60">
                                    Отель: {rev.hotel}
                                </span>
                            </div>

                            {/* Message Bubble */}
                            <div className={`relative flex-1 ${rev.app === 'whatsapp' ? 'bg-teal-500/10 border-teal-500/20 shadow-[0_10px_30px_-10px_rgba(20,184,166,0.15)]' : 'bg-white/5 border-[var(--color-card-border)]'} p-6 rounded-[2rem] rounded-tl-none border mb-2 text-base text-[var(--color-text)] leading-relaxed`}>
                                <p className="font-medium opacity-90">{rev.text}</p>
                                <div className="flex justify-end items-center mt-6 space-x-1.5">
                                    <span className="text-[10px] text-[var(--color-text)] opacity-40 font-black tracking-widest">{rev.time}</span>
                                    <CheckCheck className="w-4 h-4 text-teal-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Triggers Infographic */}
                <div className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-10 md:p-16 shadow-2xl border border-[var(--color-card-border)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/15 transition-all duration-700"></div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 lg:gap-8 divide-y-0 lg:divide-x divide-white/10">
                        {triggers.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center px-2 sm:px-4 py-4 sm:py-8 lg:py-0"
                            >
                                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-3 sm:mb-6 group-hover:rotate-12 transition-all">
                                    {React.cloneElement(item.icon, { className: "w-8 h-8 text-teal-600 dark:text-teal-400" })}
                                </div>
                                <div className="text-3xl sm:text-5xl font-black text-[var(--color-text)] mb-2 sm:mb-3 tracking-tighter">{item.val}</div>
                                <p className="text-[10px] sm:text-xs text-[var(--color-text)] font-black opacity-60 leading-relaxed uppercase tracking-[0.2em]">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
