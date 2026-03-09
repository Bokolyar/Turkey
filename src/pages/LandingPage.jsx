import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HeroBlock } from '../components/HeroBlock';
import { QuizBlock } from '../components/QuizBlock';
import { ComparisonBlock } from '../components/ComparisonBlock';
import { ExpertPicksBlock } from '../components/ExpertPicksBlock';
import { TrustBlock } from '../components/TrustBlock';
import { SocialProofBlock } from '../components/SocialProofBlock';
import { FAQBlock } from '../components/FAQBlock';

export function LandingPage() {
    const [data, setData] = useState(null);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        // Use relative path for Vercel/Local compatibility
        // Local: proxied via vite.config.js
        // Vercel: handled via rewrites in vercel.json
        fetch('/api/content')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(json => {
                if (json.success) setData(json.data);
            })
            .catch(err => console.error("Failed to fetch landing data:", err));
    }, []);

    const scrollToQuiz = () => {
        const element = document.getElementById('quiz');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500 bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p>Загрузка данных сайта...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans antialiased text-slate-900 bg-white">
            {/* Scroll Progress Bar */}
            {data.GlobalSettings?.visible !== false && (
                <motion.div
                    className="fixed top-0 left-0 right-0 z-[9999] origin-left"
                    style={{
                        scaleX,
                        background: data.GlobalSettings?.scrollProgressColor || 'linear-gradient(to right, #14b8a6, #10b981, #0d9488)',
                        height: data.GlobalSettings?.scrollProgressHeight || '6px'
                    }}
                />
            )}

            {data.HeroBlock?.visible && <HeroBlock data={data.HeroBlock} onQuizClick={scrollToQuiz} />}
            {data.QuizBlock?.visible && <QuizBlock data={data.QuizBlock} />}
            {data.ComparisonBlock?.visible && <ComparisonBlock data={data.ComparisonBlock} />}
            {data.ExpertPicksBlock?.visible && <ExpertPicksBlock data={data.ExpertPicksBlock} onQuoteClick={scrollToQuiz} />}
            {data.TrustBlock?.visible && <TrustBlock data={data.TrustBlock} />}
            {data.SocialProofBlock?.visible && <SocialProofBlock data={data.SocialProofBlock} />}
            {data.FAQBlock?.visible && <FAQBlock data={data.FAQBlock} />}
        </div>
    );
}
