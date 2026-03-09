import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Gift, Phone } from 'lucide-react';
import { cn } from '../utils';

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

export function QuizBlock() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [familyData, setFamilyData] = useState({ adults: 2, children: 1, childrenAges: [5] });
    const [phone, setPhone] = useState('');

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

    const renderFamilyInput = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-medium text-slate-700">Количество взрослых:</span>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setFamilyData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300">-</button>
                    <span className="w-4 text-center font-bold text-lg">{familyData.adults}</span>
                    <button onClick={() => setFamilyData(prev => ({ ...prev, adults: Math.min(5, prev.adults + 1) }))} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300">+</button>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-medium text-slate-700">Количество детей:</span>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setFamilyData(prev => ({ ...prev, children: Math.max(0, prev.children - 1), childrenAges: prev.childrenAges.slice(0, Math.max(0, prev.children - 1)) }))} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300">-</button>
                    <span className="w-4 text-center font-bold text-lg">{familyData.children}</span>
                    <button onClick={() => setFamilyData(prev => ({ ...prev, children: Math.min(5, prev.children + 1), childrenAges: [...prev.childrenAges, 0] }))} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300">+</button>
                </div>
            </div>

            {familyData.children > 0 && (
                <div className="space-y-3">
                    <span className="font-medium text-slate-700 block">Возраст детей:</span>
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
                                className="p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                {Array.from({ length: 18 }).map((_, age) => (
                                    <option key={age} value={age}>{age} {age === 1 ? 'год' : age > 1 && age < 5 ? 'года' : 'лет'}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                </div>
            )}

            <button onClick={handleNext} className="w-full mt-6 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-colors flex justify-center items-center">
                Далее <ChevronRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    );

    return (
        <section id="quiz" className="py-20 bg-slate-50">
            <div className="container max-w-4xl mx-auto px-4">

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Пройдите тест и получите <span className="text-sky-600">ТОП-5 отелей</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Ответьте на 5 коротких вопросов, чтобы мы подобрали идеальные варианты для вашей семьи.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    {/* Progress Bar */}
                    {!isFinished && (
                        <div className="bg-slate-100 h-2 w-full">
                            <motion.div
                                className="h-full bg-amber-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {!isFinished ? (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-sky-600 font-bold mb-2 block">Вопрос {step + 1} из {QUESTIONS.length}</span>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentQ.title}</h3>
                                    {currentQ.subtitle && <p className="text-slate-500 mb-6">{currentQ.subtitle}</p>}

                                    {currentQ.type === 'custom_family' ? renderFamilyInput() : (
                                        <div className="space-y-3 mt-6">
                                            {currentQ.options?.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleOptionSelect(currentQ.id, opt.id)}
                                                    className={cn(
                                                        "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center",
                                                        answers[currentQ.id] === opt.id
                                                            ? "border-sky-500 bg-sky-50"
                                                            : "border-slate-100 bg-white hover:border-sky-200 hover:bg-sky-50/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0",
                                                        answers[currentQ.id] === opt.id ? "border-sky-500" : "border-slate-300"
                                                    )}>
                                                        {answers[currentQ.id] === opt.id && <div className="w-3 h-3 rounded-full bg-sky-500" />}
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="finish"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-4">Спасибо! Мы уже начали анализировать базу отелей под ваш состав семьи</h3>
                                    <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
                                        Оставьте ваш номер телефона, чтобы мы прислали ТОП-5 наиболее подходящих вариантов и ваш подарок — чек-лист по сборам в Турцию.
                                    </p>

                                    <div className="max-w-sm mx-auto space-y-4">
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                type="tel"
                                                placeholder="+7 (___) ___-__-__"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:bg-white transition-all text-lg"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 transition-all flex justify-center items-center text-lg">
                                            Получить подборку в WhatsApp
                                        </button>
                                        <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                                            Вашими данными занимается живой эксперт, а не бот. Мы на связи с 2012 года.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Gift Banner */}
                <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
                        <Gift className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-medium text-slate-600">Бонус: Чек-лист «Что взять с собой в Турцию» бесплатно после теста</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
