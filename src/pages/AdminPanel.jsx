import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Save, Image as ImageIcon, LogOut, Loader2 } from 'lucide-react';

export function AdminPanel() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('HeroBlock');
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [token, navigate]);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/content');
            const json = await res.json();
            if (json.success) {
                setData(json.data);
                // If HeroBlock is not available or we want to default to the first sorted block:
                const availableBlocks = Object.keys(json.data).sort((a, b) => {
                    if (a === 'GlobalSettings') return -1;
                    if (b === 'GlobalSettings') return 1;
                    if (a === 'HeroBlock') return -1;
                    if (b === 'HeroBlock') return 1;
                    return 0;
                });
                if (availableBlocks.length > 0 && !json.data[activeTab]) {
                    setActiveTab(availableBlocks[0]);
                }
            }
        } catch (err) {
            console.error('Failed to fetch data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (res.status === 403) {
                navigate('/login');
            }
        } catch (err) {
            console.error('Save failed', err);
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (file, blockMapPathFn) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const json = await res.json();
            if (json.success) {
                blockMapPathFn(json.filename);
            }
        } catch (err) {
            console.error('Upload failed', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>;
    if (!data) return <div className="p-8 text-center text-red-500">Failed to load data. Ensure backend is running.</div>;

    const blockNamesRu = {
        'GlobalSettings': 'Общие настройки',
        'HeroBlock': 'Главный экран',
        'QuizBlock': 'Квиз (Опрос)',
        'ComparisonBlock': 'Сравнение отелей',
        'ExpertPicksBlock': 'Рекомендуемые отели',
        'TrustBlock': 'Наши эксперты',
        'SocialProofBlock': 'Отзывы клиентов',
        'FAQBlock': 'Вопросы и ответы (FAQ)'
    };

    const fieldNamesRu = {
        'title': 'Заголовок',
        'subtitle': 'Подзаголовок',
        'desc': 'Описание',
        'buttonText': 'Текст кнопки',
        'subButtonText': 'Подпись под кнопкой',
        'bgImage': 'Фоновое изображение',
        'visible': 'Видимость блока',
        'col1Title': 'Заголовок колонки 1',
        'col2Title': 'Заголовок колонки 2',
        'expertsTitle': 'Заголовок раздела экспертов',
        'footerTitle': 'Заголовок внизу',
        'footerSubtitle': 'Подзаголовок внизу',
        'footerBtn': 'Текст кнопки внизу',
        'scrollProgressColor': 'Цвет полосы прокрутки',
        'scrollProgressHeight': 'Высота полосы прокрутки'
    };

    // Sidebar order matching LandingPage.jsx
    const sidebarOrder = [
        'HeroBlock',
        'QuizBlock',
        'ComparisonBlock',
        'ExpertPicksBlock',
        'TrustBlock',
        'SocialProofBlock',
        'FAQBlock',
        'GlobalSettings'
    ];

    const blocks = sidebarOrder.filter(b => data[b]);
    const currentBlockData = data[activeTab];

    const updateField = (field, value) => {
        setData(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [field]: value
            }
        }));
    };

    const toggleVisibility = () => {
        updateField('visible', !currentBlockData.visible);
    };

    const addFaqItem = () => {
        const newFaqs = [...(currentBlockData.faqs || [])];
        newFaqs.push({ q: 'Новый вопрос', a: 'Новый ответ' });
        updateField('faqs', newFaqs);
    };

    const removeFaqItem = (idx) => {
        const newFaqs = currentBlockData.faqs.filter((_, i) => i !== idx);
        updateField('faqs', newFaqs);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white tracking-tight">Администрирование</h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">Turkey Journey 2026</p>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    {blocks.map(block => (
                        <button
                            key={block}
                            onClick={() => setActiveTab(block)}
                            className={`w-full text-left px-6 py-4 transition-all duration-200 border-l-4 ${activeTab === block ? 'bg-sky-600/20 text-white font-bold border-sky-500' : 'hover:bg-slate-800 border-transparent text-slate-400'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm">{blockNamesRu[block] || block}</span>
                                {data[block].visible ? <Eye className="w-4 h-4 text-sky-400" /> : <EyeOff className="w-4 h-4 text-slate-600" />}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-700 bg-slate-950/50">
                    <button onClick={handleLogout} className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-2 py-2 rounded">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Выйти из системы</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center sticky top-0 z-10 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{blockNamesRu[activeTab] || activeTab}</h1>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">Редактирование контента</p>
                    </div>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <button
                            onClick={toggleVisibility}
                            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${currentBlockData.visible ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                        >
                            {currentBlockData.visible ? <><Eye className="w-4 h-4" /> <span>Блок виден</span></> : <><EyeOff className="w-4 h-4" /> <span>Блок скрыт</span></>}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-sky-600/20 disabled:opacity-50 active:scale-95"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>Сохранить всё</span>
                        </button>
                    </div>
                </div>

                <div className="p-8 max-w-5xl mx-auto w-full">
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 space-y-10">

                        {/* Generic String Fields Renderer */}
                        <div className="grid grid-cols-1 gap-8">
                            {Object.keys(currentBlockData).map(key => {
                                if (key === 'visible' || key === 'triggers' || key === 'hotels' || key === 'experts' || key === 'faqs') return null;

                                const value = currentBlockData[key];
                                const isImage = key.toLowerCase().includes('image');
                                const label = fieldNamesRu[key] || key;

                                if (typeof value === 'string') {
                                    return (
                                        <div key={key} className="space-y-3">
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
                                            {isImage ? (
                                                <div className="flex items-end space-x-6">
                                                    {value && (
                                                        <div className="w-48 h-32 rounded-2xl bg-slate-50 border-2 border-slate-100 overflow-hidden shadow-inner group relative">
                                                            <img
                                                                src={value.startsWith('http') ? value : `/api/uploads/${value}`}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                alt="Preview"
                                                            />
                                                        </div>
                                                    )}
                                                    <label className="cursor-pointer bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl flex items-center space-x-2 font-bold border-2 border-slate-200 transition-all shadow-sm active:scale-95">
                                                        <ImageIcon className="w-5 h-5 text-sky-500" />
                                                        <span>Изменить фото</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                if (e.target.files[0]) {
                                                                    handleImageUpload(e.target.files[0], (filename) => updateField(key, filename));
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            ) : value.length > 80 ? (
                                                <textarea
                                                    value={value}
                                                    onChange={e => updateField(key, e.target.value)}
                                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 outline-none transition-all text-slate-700 leading-relaxed"
                                                    rows={4}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={e => updateField(key, e.target.value)}
                                                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 outline-none transition-all text-slate-700 font-medium"
                                                />
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Array: Triggers */}
                        {currentBlockData.triggers && (
                            <div className="space-y-6 pt-8 border-t-2 border-slate-50">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center">
                                    <div className="w-2 h-8 bg-amber-400 rounded-full mr-4"></div>
                                    Преимущества (триггеры)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {currentBlockData.triggers.map((trigger, idx) => (
                                        <div key={idx} className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 focus-within:border-sky-200 transition-colors">
                                            <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">ТРИГГЕР #{idx + 1}</label>
                                            <textarea
                                                value={trigger.text}
                                                onChange={e => {
                                                    const newTriggers = [...currentBlockData.triggers];
                                                    newTriggers[idx] = { ...trigger, text: e.target.value };
                                                    updateField('triggers', newTriggers);
                                                }}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all text-sm font-medium h-24"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Array: Hotels */}
                        {currentBlockData.hotels && (
                            <div className="space-y-8 pt-8 border-t-2 border-slate-50">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center">
                                    <div className="w-2 h-8 bg-sky-500 rounded-full mr-4"></div>
                                    Список рекомендованных отелей
                                </h3>
                                <div className="space-y-8">
                                    {currentBlockData.hotels.map((hotel, idx) => (
                                        <div key={idx} className="p-8 bg-slate-50 rounded-[40px] border-2 border-slate-100 space-y-6 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100/50 rounded-bl-full opacity-50"></div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Название отеля</label>
                                                    <input
                                                        type="text"
                                                        value={hotel.name}
                                                        onChange={e => {
                                                            const newHotels = [...currentBlockData.hotels];
                                                            newHotels[idx] = { ...hotel, name: e.target.value };
                                                            updateField('hotels', newHotels);
                                                        }}
                                                        className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Категория / Бейдж</label>
                                                    <input
                                                        type="text"
                                                        value={hotel.category}
                                                        onChange={e => {
                                                            const newHotels = [...currentBlockData.hotels];
                                                            newHotels[idx] = { ...hotel, category: e.target.value };
                                                            updateField('hotels', newHotels);
                                                        }}
                                                        className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none text-sky-700 font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Фотография отеля</label>
                                                <div className="flex items-center space-x-6">
                                                    <div className="w-40 h-24 rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-sm">
                                                        <img
                                                            src={hotel.image?.startsWith('http') ? hotel.image : `/api/uploads/${hotel.image}`}
                                                            className="w-full h-full object-cover"
                                                            alt="Preview"
                                                        />
                                                    </div>
                                                    <label className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 font-bold transition-all shadow-md active:scale-95 text-sm">
                                                        <ImageIcon className="w-4 h-4" />
                                                        <span>Загрузить фото</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                if (e.target.files[0]) {
                                                                    handleImageUpload(e.target.files[0], (filename) => {
                                                                        const newHotels = [...currentBlockData.hotels];
                                                                        newHotels[idx] = { ...hotel, image: filename };
                                                                        updateField('hotels', newHotels);
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Цитата / Описание эксперта</label>
                                                <textarea
                                                    value={hotel.quote}
                                                    onChange={e => {
                                                        const newHotels = [...currentBlockData.hotels];
                                                        newHotels[idx] = { ...hotel, quote: e.target.value };
                                                        updateField('hotels', newHotels);
                                                    }}
                                                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none text-sm leading-relaxed"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Array: Experts */}
                        {currentBlockData.experts && (
                            <div className="space-y-8 pt-8 border-t-2 border-slate-50">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center">
                                    <div className="w-2 h-8 bg-teal-500 rounded-full mr-4"></div>
                                    Список экспертов
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {currentBlockData.experts.map((expert, idx) => (
                                        <div key={idx} className="p-8 bg-slate-50 rounded-[40px] border-2 border-slate-100 space-y-6">
                                            <div className="flex items-end space-x-6">
                                                <div className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-200 overflow-hidden shadow-md">
                                                    <img
                                                        src={expert.image?.startsWith('http') ? expert.image : `/api/uploads/${expert.image}`}
                                                        className="w-full h-full object-cover"
                                                        alt="Expert"
                                                    />
                                                </div>
                                                <label className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-xl flex items-center space-x-2 font-bold border-2 border-slate-200 transition-all text-xs mb-1">
                                                    <ImageIcon className="w-4 h-4 text-teal-500" />
                                                    <span>Фото</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            if (e.target.files[0]) {
                                                                handleImageUpload(e.target.files[0], (filename) => {
                                                                    const newExperts = [...currentBlockData.experts];
                                                                    newExperts[idx] = { ...expert, image: filename };
                                                                    updateField('experts', newExperts);
                                                                });
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Имя</label>
                                                    <input
                                                        type="text"
                                                        value={expert.name}
                                                        onChange={e => {
                                                            const newExperts = [...currentBlockData.experts];
                                                            newExperts[idx] = { ...expert, name: e.target.value };
                                                            updateField('experts', newExperts);
                                                        }}
                                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Специализация</label>
                                                    <input
                                                        type="text"
                                                        value={expert.role}
                                                        onChange={e => {
                                                            const newExperts = [...currentBlockData.experts];
                                                            newExperts[idx] = { ...expert, role: e.target.value };
                                                            updateField('experts', newExperts);
                                                        }}
                                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-sm text-slate-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Array: Dynamic FAQ Editor */}
                        {activeTab === 'FAQBlock' && (
                            <div className="space-y-8 pt-8 border-t-2 border-slate-50">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center">
                                        <div className="w-2 h-8 bg-purple-500 rounded-full mr-4"></div>
                                        Список вопросов и ответов
                                    </h3>
                                    <button
                                        onClick={addFaqItem}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-purple-200 active:scale-95 flex items-center space-x-2 text-sm"
                                    >
                                        <span>+ Добавить вопрос</span>
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    {(currentBlockData.faqs || []).map((faq, idx) => (
                                        <div key={idx} className="p-8 bg-slate-50 rounded-[32px] border-2 border-slate-100 space-y-6 relative hover:border-purple-200 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">БЛОК FAQ #{idx + 1}</label>
                                                <button
                                                    onClick={() => removeFaqItem(idx)}
                                                    className="text-red-400 hover:text-red-600 p-1 transition-colors"
                                                    title="Удалить вопрос"
                                                >
                                                    <EyeOff className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Вопрос</label>
                                                    <input
                                                        type="text"
                                                        value={faq.q || faq.question}
                                                        onChange={e => {
                                                            const newFaqs = [...currentBlockData.faqs];
                                                            newFaqs[idx] = { ...faq, q: e.target.value };
                                                            updateField('faqs', newFaqs);
                                                        }}
                                                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none font-bold text-slate-800"
                                                        placeholder="Введите вопрос..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Ответ</label>
                                                    <textarea
                                                        value={faq.a || faq.answer}
                                                        onChange={e => {
                                                            const newFaqs = [...currentBlockData.faqs];
                                                            newFaqs[idx] = { ...faq, a: e.target.value };
                                                            updateField('faqs', newFaqs);
                                                        }}
                                                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-sm leading-relaxed text-slate-600 h-32"
                                                        placeholder="Введите подробный ответ..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!currentBlockData.faqs || currentBlockData.faqs.length === 0) && (
                                        <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                            <p className="text-slate-400 font-medium">Список вопросов пуст. Нажмите кнопку выше, чтобы добавить первый вопрос.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
