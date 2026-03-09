import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Gift, Phone } from 'lucide-react';
import { cn } from '../utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const QUESTIONS = [
    {
        id: 'family',
        title: 'Состав вашей семьи и возраст детей',
        subtitle: 'Многие отели Турции предоставляют бесплатное проживание детям до 12 лет — мы учтем это при подборе',
        type: 'custom_family',
    },
    {
        id: 'beach',
        title: 'Какой тип пляжа предпочтителен для вашей семьи?',
        options: [
            { id: 'sand', label: 'Только мягкий песок (Белек, Сиде)' },
            { id: 'pebble', label: 'Мелкая галька и прозрачнейшая вода (Кемер)' },
            { id: 'any', label: 'Не имеет значения, главное баланс цена/качество' }
        ]
    },
    {
        id: 'service',
        title: 'Что для вас «идеальный сервис» в семейном отеле?',
        options: [
            { id: 'food', label: 'Качественное питание (свежевыжатые соки, диетический стол, качественный алкоголь)' },
            { id: 'kids', label: 'Реальная занятость детей (профессиональные клубы)' },
            { id: 'safe', label: 'Безопасность и чистота (высокие санитарные нормы, отсутствие толп)' },
            { id: 'sport', label: 'Спортивный уклон (теннис, футбол, водные виды спорта)' }
        ]
    },
    {
        id: 'month',
        title: 'В каком месяце планируете отпуск?',
        options: [
            { id: 'may_jun', label: 'Май / Июнь (Начало сезона, комфортная температура)' },
            { id: 'jul_aug', label: 'Июль / Август (Пик сезона, самое теплое море)' },
            { id: 'sep_oct', label: 'Сентябрь / Октябрь («Бархатный сезон», идеальное солнце)' },
            { id: 'any', label: 'Пока не определились, ищем выгодные даты' }
        ]
    },
    {
        id: 'budget',
        title: 'Ориентировочный бюджет на всю семью',
        options: [
            { id: 'u250', label: 'До 250 000 руб. (Максимальное качество в этом бюджете)' },
            { id: 'u400', label: '250 000 – 400 000 руб. (Оптимальный баланс сервиса и инфраструктуры)' },
            { id: 'over400', label: 'От 400 000 руб. (Топовые отели с лучшими детскими концепциями)' },
            { id: 'dunno', label: 'Пока не определились, нужен совет эксперта' }
        ]
    }
];

export function QuizBlock({ data }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [familyData, setFamilyData] = useState({ adults: 2, children: 1, childrenAges: [5] });
    const [phone, setPhone] = useState('');
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const resultRef = useRef(null);

    const currentQ = QUESTIONS[step];
    const isFinished = step >= QUESTIONS.length;

    const handleNext = () => {
        if (step < QUESTIONS.length) {
            setStep(s => s + 1);
        }
    };

    const handleOptionSelect = (qId, optId) => {
        setAnswers(prev => ({ ...prev, [qId]: optId }));
        setTimeout(handleNext, 400); // auto-advance
    };

    const generatePdf = async () => {
        if (!resultRef.current) return;
        setIsGeneratingPdf(true);
        try {
            const canvas = await html2canvas(resultRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Turkey_Journey_Results.pdf');
        } catch (error) {
            console.error('PDF generation failed:', error);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const getAnswerLabel = (qId, optId) => {
        const q = QUESTIONS.find(q => q.id === qId);
        return q?.options?.find(o => o.id === optId)?.label || optId;
    };

    const renderFamilyInput = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-[var(--color-card-border)]">
                <span className="font-bold text-[var(--color-text)]">Количество взрослых:</span>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setFamilyData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))} className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-white transition-colors">-</button>
                    <span className="w-4 text-center font-black text-xl">{familyData.adults}</span>
                    <button onClick={() => setFamilyData(prev => ({ ...prev, adults: Math.min(5, prev.adults + 1) }))} className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-white transition-colors">+</button>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-[var(--color-card-border)]">
                <span className="font-bold text-[var(--color-text)]">Количество детей:</span>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setFamilyData(prev => ({ ...prev, children: Math.max(0, prev.children - 1), childrenAges: prev.childrenAges.slice(0, Math.max(0, prev.children - 1)) }))} className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-white transition-colors">-</button>
                    <span className="w-4 text-center font-black text-xl">{familyData.children}</span>
                    <button onClick={() => setFamilyData(prev => ({ ...prev, children: Math.min(5, prev.children + 1), childrenAges: [...prev.childrenAges, 0] }))} className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-white transition-colors">+</button>
                </div>
            </div>

            {familyData.children > 0 && (
                <div className="space-y-3">
                    <span className="font-black text-teal-500 uppercase tracking-widest text-[10px] block">Возраст детей:</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Array.from({ length: familyData.children }).map((_, idx) => (
                            <select
                                key={idx}
                                value={familyData.childrenAges[idx] || 0}
                                onChange={(e) => {
                                    const newAges = [...familyData.childrenAges];
                                    newAges[idx] = parseInt(e.target.value);
                                    setFamilyData(prev => ({ ...prev, childrenAges: newAges }));
                                }}
                                className="p-4 bg-white/10 border border-[var(--color-card-border)] rounded-xl outline-none focus:ring-2 focus:ring-teal-500 text-[var(--color-text)] font-bold"
                            >
                                {Array.from({ length: 18 }).map((_, age) => (
                                    <option key={age} value={age} className="text-slate-900">{age} {age === 1 ? 'год' : age > 1 && age < 5 ? 'года' : 'лет'}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                </div>
            )}

            <button onClick={handleNext} className="w-full mt-6 py-5 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 transition-all flex justify-center items-center uppercase tracking-widest">
                Далее <ChevronRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    );

    return (
        <section id="quiz" className="py-24 bg-[var(--color-bg)] transition-colors duration-500">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[var(--color-text)] mb-6 leading-tight">
                        {data?.title || 'Пройдите тест и получите ТОП-5 отелей'}
                    </h2>
                    <p className="text-lg text-[var(--color-text)] opacity-70 max-w-2xl mx-auto">
                        {data?.subtitle || 'Ответьте на 5 коротких вопросов, чтобы мы подобрали идеальные варианты для вашей семьи.'}
                    </p>
                </div>

                <div className="bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[var(--color-card-border)] relative">
                    {!isFinished && (
                        <div className="bg-white/5 h-2 w-full">
                            <motion.div
                                className="h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-16 min-h-[500px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {!isFinished ? (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                >
                                    <div className="bg-teal-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-4 shadow-lg shadow-teal-500/20">
                                        Вопрос {step + 1} / {QUESTIONS.length}
                                    </div>
                                    <h3 className="text-3xl font-black text-[var(--color-text)] mb-4 leading-tight">{currentQ.title}</h3>
                                    {currentQ.subtitle && <p className="text-[var(--color-text)] opacity-60 mb-8 font-medium">{currentQ.subtitle}</p>}

                                    {currentQ.type === 'custom_family' ? renderFamilyInput() : (
                                        <div className="grid grid-cols-1 gap-4 mt-8">
                                            {currentQ.options?.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleOptionSelect(currentQ.id, opt.id)}
                                                    className={cn(
                                                        "w-full text-left p-6 rounded-[1.5rem] border-2 transition-all flex items-center group relative overflow-hidden",
                                                        answers[currentQ.id] === opt.id
                                                            ? "border-teal-500 bg-teal-500/10"
                                                            : "border-[var(--color-card-border)] bg-white/5 hover:border-teal-500/50 hover:bg-teal-500/5 font-bold"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-6 h-6 rounded-full border-2 mr-6 flex items-center justify-center flex-shrink-0 transition-all",
                                                        answers[currentQ.id] === opt.id ? "border-teal-500 scale-110" : "border-[var(--color-card-border)]"
                                                    )}>
                                                        {answers[currentQ.id] === opt.id && <div className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />}
                                                    </div>
                                                    <span className="text-[var(--color-text)] font-black text-sm sm:text-lg group-hover:translate-x-1 transition-transform">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="finish"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div ref={resultRef} className="bg-white p-10 rounded-[2rem] mb-10 border border-slate-100 text-left shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center space-x-5 mb-10">
                                            <div className="w-16 h-16 bg-teal-500 text-white rounded-[1.25rem] flex items-center justify-center shadow-xl">
                                                <div className="font-black text-2xl">TJ</div>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Turkey Journey 2026</h4>
                                                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">Персональный подбор отелей</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Состав группы</p>
                                                <p className="font-black text-slate-800">{familyData.adults} взр + {familyData.children} дет ({familyData.childrenAges.join(', ')} л)</p>
                                            </div>
                                            {Object.entries(answers).map(([qId, optId]) => (
                                                <div key={qId} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                                        {QUESTIONS.find(q => q.id === qId)?.id === 'month' ? 'Сезон отдыха' : QUESTIONS.find(q => q.id === qId)?.id === 'budget' ? 'Бюджет' : 'Предпочтения'}
                                                    </p>
                                                    <p className="font-black text-slate-800 truncate">{getAnswerLabel(qId, optId)}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-teal-500 p-8 rounded-[1.5rem] text-center text-white relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-80">Статус обработки</p>
                                            <p className="text-xl font-black mb-6">Эксперт уже выбирает ТОП-5 отелей из 150+ доступных вариантов.</p>
                                            <div className="flex items-center justify-center space-x-3">
                                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-black text-[var(--color-text)] mb-6">Вау! Отличный выбор! 🎉</h3>

                                    <div className="max-w-md mx-auto space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={generatePdf}
                                                disabled={isGeneratingPdf}
                                                className="w-full py-5 rounded-2xl border-2 border-teal-500 text-teal-500 font-black text-sm uppercase tracking-widest hover:bg-teal-500 hover:text-white transition-all flex items-center justify-center shadow-lg shadow-teal-500/10 h-16"
                                            >
                                                {isGeneratingPdf ? 'Сборка...' : 'Скачать PDF'}
                                            </button>
                                            <div className="relative h-16">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <input
                                                    type="tel"
                                                    placeholder="+7 (___) ___"
                                                    className="w-full pl-12 pr-4 h-full bg-white/5 border-2 border-[var(--color-card-border)] rounded-2xl outline-none focus:border-teal-500 focus:bg-white/10 transition-all text-lg font-black"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <button className="w-full py-6 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-2xl shadow-2xl shadow-teal-500/40 transition-all flex justify-center items-center text-xl uppercase tracking-widest group">
                                            Получить подборку в WhatsApp
                                            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                                        </button>
                                        <p className="text-xs text-[var(--color-text)] opacity-40 font-bold uppercase tracking-widest mt-6">
                                            Вашим запросом займется эксперт Дарья. Мы на связи с 2012 года.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-4 bg-[var(--color-card-bg)] backdrop-blur-[var(--glass-blur)] px-8 py-4 rounded-full shadow-2xl border border-[var(--color-card-border)]"
                    >
                        <div className="bg-amber-400 p-2 rounded-xl">
                            <Gift className="w-6 h-6 text-amber-950" />
                        </div>
                        <span className="text-sm font-black text-[var(--color-text)] uppercase tracking-widest">
                            Бонус: Чек-лист «Сборы в Турцию» бесплатно
                        </span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
