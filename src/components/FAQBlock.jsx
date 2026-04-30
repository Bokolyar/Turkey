import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { cn } from '../utils';

export function FAQBlock({ data }) {
    const faqs = data?.faqs || [
        {
            q: 'В чем реальная выгода раннего бронирования?',
            a: 'Это не только скидка до 45% от отелей. Самое важное — это наличие мест. В лучшие семейные отели места на лето заканчиваются еще в марте. Бронируя заранее, вы фиксируете цену и гарантируете своей семье именно тот уровень отдыха, который выбрали. Предоплата может составить всего 5% от стоимости тура.'
        },
        {
            q: 'Можно ли оформить тур и договор онлайн?',
            a: 'Да, конечно. Весь процесс от подбора до подписания договора и оплаты происходит дистанционно. Договор подписывается онлайн, оплата производится по официальной ссылке. Все документы приходят вам в электронном виде и имеют полную юридическую силу.'
        },
        {
            q: 'Как работает гарантия лучшей цены?',
            a: 'Мы работаем по прямым ценам крупнейших туроператоров, наша экспертная поддержка уже включена в стоимость. Если вы найдете идентичное предложение дешевле — мы обоснуем разницу или предложим лучшие условия. С нами вы застрахованы от скрытых наценок.'
        },
        {
            q: 'Подходят ли ваши отели для отдыха с грудными детьми?',
            a: 'Да. Мы специализируемся на концепциях, где есть Baby Club (0+). В таких отелях предусмотрено всё: от стерилизаторов и подогревателей бутылочек до специального баночного питания и отдельных тихих зон для сна в колясках.'
        },
        {
            q: 'Как работает акция «дети до 12 лет отдыхают бесплатно»?',
            a: 'Многие отели Турции участвуют в этой акции. Проживание и питание детей предоставляется бесплатно при размещении в номере с двумя взрослыми. В итоговой стоимости тура на ребенка учитывается только стоимость авиаперелета.'
        }
    ];

    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section className="py-14 sm:py-20 md:py-24 bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden relative">
            <div className="container mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--color-text)] mb-6"
                    >
                        {data?.title || (
                            <>Остались вопросы? <br className="hidden md:block" />Мы ответили на то, что чаще всего <span className="text-teal-500 border-b-4 border-amber-400">волнует родителей</span></>
                        )}
                    </motion.h2>
                </div>

                <div className="space-y-3 mb-14 sm:mb-24 max-w-4xl mx-auto">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={cn(
                                    "border rounded-[2rem] overflow-hidden transition-all duration-500 backdrop-blur-[var(--glass-blur)]",
                                    isOpen
                                        ? "border-teal-500/50 bg-teal-500/5 shadow-2xl"
                                        : "border-[var(--color-card-border)] bg-[var(--color-card-bg)] hover:border-teal-500/30"
                                )}
                            >
                                <button
                                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                                    className="w-full text-left px-5 sm:px-10 py-5 sm:py-8 flex items-center justify-between focus:outline-none group"
                                >
                                    <span className={cn(
                                        "font-black text-sm sm:text-base md:text-xl transition-colors pr-4",
                                        isOpen ? "text-teal-500" : "text-[var(--color-text)] opacity-80 group-hover:opacity-100"
                                    )}>
                                        {faq.q || faq.question}
                                    </span>
                                    <div className={cn(
                                        "w-8 h-8 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0",
                                        isOpen ? "bg-teal-500 text-white rotate-180 shadow-lg shadow-teal-500/20" : "bg-white/5 text-teal-500 border border-teal-500/20"
                                    )}>
                                        <ChevronDown className="w-6 h-6" />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 sm:px-10 pb-6 sm:pb-8 text-[var(--color-text)] opacity-70 leading-relaxed font-bold text-sm sm:text-base md:text-lg">
                                                <div className="border-t border-[var(--color-card-border)] pt-8">
                                                    {faq.a || faq.answer}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div className="bg-slate-950 rounded-[2rem] sm:rounded-[3.5rem] p-8 sm:p-16 md:p-24 text-center relative overflow-hidden group shadow-2xl max-w-6xl mx-auto">
                    <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-teal-500 opacity-10 blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-amber-500 opacity-5 blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 sm:mb-10 shadow-2xl">
                            <MessageSquare className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5 sm:mb-8 uppercase tracking-tighter leading-none">
                            {data?.footerTitle || 'Не нашли свой вопрос?'}
                        </h3>
                        <p className="text-slate-400 text-base sm:text-lg md:text-xl xl:text-2xl mb-8 sm:mb-12 leading-relaxed font-bold">
                            {data?.footerSubtitle || 'Напишите нам — Дарья и Александра ответят вам в течение 10 минут'}
                        </p>
                        <button className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-6 text-sm sm:text-base font-black text-white bg-teal-600 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(20,184,166,0.3)] hover:bg-teal-500 transition-all mx-auto overflow-hidden uppercase tracking-[0.2em]">
                            <span className="relative z-10">{data?.footerBtn || 'Задать вопрос'}</span>
                            <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[45deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out"></div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
