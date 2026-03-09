import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { cn } from '../utils';

export function FAQBlock() {
    const faqs = [
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
        <section className="py-24 bg-white">
            <div className="container max-w-4xl mx-auto px-4">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
                    >
                        Остались вопросы? <br className="hidden md:block" />Мы ответили на то, что чаще всего <span className="text-sky-600 border-b-4 border-amber-400">волнует родителей</span>
                    </motion.h2>
                </div>

                <div className="space-y-4 mb-20">
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
                                    "border rounded-2xl overflow-hidden transition-all duration-300",
                                    isOpen ? "border-sky-500 bg-sky-50 shadow-md" : "border-slate-200 bg-white hover:border-sky-300"
                                )}
                            >
                                <button
                                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                                >
                                    <span className={cn("font-bold text-lg", isOpen ? "text-sky-900" : "text-slate-800")}>
                                        {faq.q}
                                    </span>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4",
                                        isOpen ? "bg-sky-200 text-sky-700 rotate-180" : "bg-slate-100 text-slate-500"
                                    )}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-sky-800 leading-relaxed">
                                                <div className="border-t border-sky-200/60 pt-4">
                                                    {faq.a}
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
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-20 blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500 opacity-20 blur-[80px]"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Не нашли свой вопрос?
                        </h3>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Напишите нам — Дарья и Александра ответят вам в течение 10 минут
                        </p>
                        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors mx-auto overflow-hidden">
                            <MessageSquare className="w-5 h-5 mr-3 text-sky-500 group-hover:scale-110 transition-transform" />
                            <span className="relative z-10">Задать вопрос</span>
                            <div className="absolute inset-0 w-1/4 h-full bg-slate-200/50 skew-x-12 group-hover:translate-x-[400%] transition-transform duration-700 ease-out -translate-x-full"></div>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
