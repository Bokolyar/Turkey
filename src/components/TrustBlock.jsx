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
        <section className="py-24 bg-white">
            <div className="container max-w-7xl mx-auto px-4">

                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
                    >
                        Мы не просто продаем туры — мы <span className="text-sky-600">проектируем отдых</span> для вашей семьи
                    </motion.h2>
                </div>

                {/* Principles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {principles.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Experts Section */}
                <div className="bg-sky-50 rounded-3xl p-8 md:p-12 lg:p-16 border border-sky-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-bl-full opacity-10 blur-3xl"></div>

                    <h3 className="text-3xl font-extrabold text-slate-900 mb-12 text-center relative z-10">Ваши эксперты по семейному отдыху в Турции</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                        {experts.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex flex-col sm:flex-row gap-8 items-start bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-100"
                            >
                                <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                                    <img
                                        src={exp.image}
                                        alt={`Эксперт ${exp.name}`}
                                        className="w-full h-full object-cover rounded-full shadow-inner border-4 border-sky-50"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-800">{exp.name}</h4>
                                    <p className="text-sky-600 font-medium text-sm mb-3 uppercase tracking-wide">{exp.role}</p>

                                    <div className="mb-4">
                                        <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl inline-block border border-slate-100">
                                            <span className="font-semibold block mb-1">Специализация:</span>
                                            {exp.spec}
                                        </p>
                                    </div>

                                    <div className="relative border-l-4 border-amber-400 pl-4 py-1">
                                        <p className="text-slate-600 italic leading-relaxed text-sm">
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
