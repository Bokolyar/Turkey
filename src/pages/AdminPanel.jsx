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
            const res = await fetch('http://localhost:3001/api/content');
            const json = await res.json();
            if (json.success) {
                setData(json.data);
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
            const res = await fetch('http://localhost:3001/api/content', {
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
            const res = await fetch('http://localhost:3001/api/upload', {
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

    const blocks = Object.keys(data);
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

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">Админ-панель</h2>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    {blocks.map(block => (
                        <button
                            key={block}
                            onClick={() => setActiveTab(block)}
                            className={`w-full text-left px-6 py-3 transition-colors ${activeTab === block ? 'bg-sky-600 text-white font-bold' : 'hover:bg-slate-800'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{block}</span>
                                {data[block].visible ? <Eye className="w-4 h-4 text-sky-300" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-700">
                    <button onClick={handleLogout} className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Выйти</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <div className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-slate-800">Редактирование: {activeTab}</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleVisibility}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-colors ${currentBlockData.visible ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}
                        >
                            {currentBlockData.visible ? <><Eye className="w-4 h-4" /> <span>Блок включен</span></> : <><EyeOff className="w-4 h-4" /> <span>Блок скрыт</span></>}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>Сохранить изменения</span>
                        </button>
                    </div>
                </div>

                <div className="p-8 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">

                        {/* Generic String Fields Renderer */}
                        {Object.keys(currentBlockData).map(key => {
                            if (key === 'visible' || key === 'triggers' || key === 'hotels' || key === 'experts') return null;

                            const value = currentBlockData[key];
                            const isImage = key.toLowerCase().includes('image');

                            if (typeof value === 'string') {
                                return (
                                    <div key={key}>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{key}</label>
                                        {isImage ? (
                                            <div className="flex items-center space-x-4">
                                                {value && (
                                                    <div className="w-32 h-20 rounded bg-slate-100 border overflow-hidden">
                                                        <img src={`http://localhost:3001/uploads/${value}`} className="w-full h-full object-cover" alt="Preview" />
                                                    </div>
                                                )}
                                                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg flex items-center space-x-2 font-medium border border-slate-300">
                                                    <ImageIcon className="w-4 h-4" />
                                                    <span>Загрузить новое фото</span>
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
                                        ) : value.length > 50 ? (
                                            <textarea
                                                value={value}
                                                onChange={e => updateField(key, e.target.value)}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                                rows={4}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={e => updateField(key, e.target.value)}
                                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                            />
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}

                        {/* Arrays like triggers or complex structures could be mapped here for deeper editing if desired. Displaying a read-only message for now to keep scope sane, or implement full JSON edit. */}
                        {(currentBlockData.triggers || currentBlockData.hotels || currentBlockData.experts) && (
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                <p className="text-amber-800 text-sm font-medium">Для редактирования списков (отели, эксперты, триггеры) в этой версии UI, пожалуйста, редактируйте текст напрямую. (Здесь можно расширить UI в будущем).</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
