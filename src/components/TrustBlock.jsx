import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Banknote, MapPin } from 'lucide-react';
import dariaImg from '../assets/expert_daria.png';
import alexandraImg from '../assets/expert_alexandra.png';

export function TrustBlock() {
    const principles = [
        {
            icon: <HeartHandshake className="w-8 h-8 text-sky-500" />,
            title: 'Специализация на семейном отдыхе с 2012 года',
            desc: 'Мы не распыляемся. Более 12 лет мы изучаем только те отели, где действительно комфортно родителям и весело детям.'
        },
        {
            icon: <MapPin className="w-8 h-8 text-sky-500" />,
            title: 'Никаких «картинок из каталогов»',
            desc: 'В базе только отели, которые мы проинспектировали лично. Мы знаем реальный вкус еды, состояние пляжей и уровень чистоты.'
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-sky-500" />,
            title: 'Только проверенные туроператоры',
            desc: 'Мы работаем исключительно с лидерами рынка, гарантируя вашу финансовую безопасность и поддержку 24/7.'
        },
        {
            icon: <Banknote className="w-8 h-8 text-sky-500" />,
            title: 'Честная цена без переплат',
            desc: 'Вы платите за реальный комфорт, а не за пафосное имя или ненужные опции. Наша экспертиза для вас абсолютно бесплатна.'
        }
    ];

    const experts = [
        {
            name: 'Дарья',
            role: 'Эксперт по отелям Белека и Сиде',
            image: dariaImg,
            spec: 'Знает, где самый пологий песчаный вход в море и лучшие ясли для малышей.',
            quote: 'Я сама мама, поэтому проверяю отели так, будто везу туда свою семью. Для меня нет мелочей, когда речь идет о безопасности и комфорте ребенка.'
        },
        {
            name: 'Александра',
            role: 'Мастер по активному отдыху (Кемер)',
            image: alexandraImg,
            spec: 'Знает, в каких клубах детям будет по-настоящему интересно.',
            quote: 'Моя задача — найти тот баланс, где дети увлечены профессиональными мастер-классами, а родители наконец-то могут насладиться тишиной.'
        }
    ];

    return (
        <section className="py-24 bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden relative">
            <div className="container max-w-7xl mx-auto px-4 relative z-10">

                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-[var(--color-text)] mb-6 leading-tight"
                    >
                        Мы не просто продаем туры — мы <span className="text-teal-500">проектируем отдых</span> для вашей семьи
                    </motion.h2>
                </div>

                {/* Principles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {principles.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] p-8 rounded-[2rem] border border-[var(--color-card-border)] hover:border-teal-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all group"
                        >
                            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/5">
                                {React.cloneElement(item.icon, { className: "w-7 h-7 text-teal-500" })}
                            </div>
                            <h3 className="text-xl font-black text-[var(--color-text)] mb-4 leading-tight">{item.title}</h3>
                            <p className="text-[var(--color-text)] opacity-60 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Experts Section */}
                <div className="bg-teal-500/5 backdrop-blur-[var(--glass-blur)] rounded-[3rem] p-8 md:p-12 lg:p-16 border border-[var(--color-card-border)] relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>

                    <h3 className="text-3xl font-black text-[var(--color-text)] mb-16 text-center relative z-10">Ваши эксперты по семейному отдыху в Турции</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                        {experts.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, type: "spring" }}
                                className="flex flex-col sm:flex-row gap-8 items-center sm:items-start bg-[var(--color-card-bg)] p-8 rounded-[2.5rem] shadow-xl border border-[var(--color-card-border)] hover:border-teal-500/30 transition-all group lg:min-h-[280px]"
                            >
                                <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 relative">
                                    <div className="absolute inset-0 bg-teal-500 rounded-full animate-pulse opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <img
                                        src={exp.image}
                                        alt={`Эксперт ${exp.name}`}
                                        className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-[var(--color-card-border)] relative z-10 grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-[var(--color-text)] mb-1">{exp.name}</h4>
                                    <p className="text-teal-500 font-black text-[10px] sm:text-xs mb-4 uppercase tracking-[0.2em]">{exp.role}</p>

                                    <div className="mb-6">
                                        <div className="text-xs text-[var(--color-text)] bg-teal-500/5 p-4 rounded-2xl border border-teal-500/10 lg:w-full">
                                            <span className="font-black block mb-2 uppercase tracking-widest text-[9px] opacity-50">Специализация:</span>
                                            <span className="font-bold opacity-80 leading-relaxed">{exp.spec}</span>
                                        </div>
                                    </div>

                                    <div className="relative border-l-4 border-amber-400 pl-6 py-1">
                                        <p className="text-[var(--color-text)] italic leading-relaxed text-sm opacity-70">
                                            «{exp.quote}»
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
