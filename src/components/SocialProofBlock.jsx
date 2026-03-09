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
        <section className="py-24 bg-slate-100 overflow-hidden">
            <div className="container max-w-6xl mx-auto px-4">

                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
                    >
                        Истории идеального отпуска <span className="text-sky-600">от первого лица</span>
                    </motion.h2>
                    <p className="text-lg text-slate-600">
                        За каждым отзывом стоит работа эксперта и счастливое лето одной семьи.
                    </p>
                </div>

                {/* Chat Bubbles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {reviews.map((rev, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="bg-sky-50 p-4 md:p-6 rounded-3xl border border-sky-100 shadow-sm flex flex-col relative h-full"
                        >
                            {/* Chat Header */}
                            <div className="flex items-center space-x-3 mb-4 border-b border-sky-100 pb-3">
                                <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-bold flex-shrink-0">
                                    {rev.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm leading-tight">{rev.name}</p>
                                    <p className="text-xs text-slate-500">онлайн</p>
                                </div>
                                <div className="ml-auto flex-shrink-0">
                                    {rev.app === 'whatsapp' ? (
                                        <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-md font-bold flex items-center">WhatsApp</div>
                                    ) : (
                                        <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md font-bold flex items-center">Telegram</div>
                                    )}
                                </div>
                            </div>

                            {/* Chat Bubble Context (Hotel name) */}
                            <div className="text-center mb-3">
                                <span className="text-[10px] bg-slate-200 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                                    Отель: {rev.hotel}
                                </span>
                            </div>

                            {/* Message Bubble */}
                            <div className={`relative ${rev.app === 'whatsapp' ? 'bg-[#dcf8c6]' : 'bg-white'} p-4 rounded-2xl rounded-tl-sm shadow-sm mb-2 text-sm text-slate-800 leading-relaxed`}>
                                <p>{rev.text}</p>
                                <div className="flex justify-end items-center mt-2 space-x-1">
                                    <span className="text-[10px] text-slate-500">{rev.time}</span>
                                    <CheckCheck className="w-3 h-3 text-sky-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Triggers Infographic */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-slate-100">
                        {triggers.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center px-4 py-4 md:py-0">
                                {item.icon}
                                <div className="text-4xl font-extrabold text-slate-900 mb-2">{item.val}</div>
                                <p className="text-sm text-slate-600 leading-snug">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
