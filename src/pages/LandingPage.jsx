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
        fetch('/api/content')
            .then(res => res.json())
            .then(json => {
                if (json.success) setData(json.data);
            })
            .catch(err => console.error("Failed to fetch landing data", err));
    }, []);

    const scrollToQuiz = () => {
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!data) return <div className="min-h-screen flex items-center justify-center text-slate-500">Загрузка данных сайта...</div>;

    return (
        <div className="font-sans antialiased text-slate-900 bg-white">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 origin-left z-[9999]"
                style={{ scaleX }}
            />

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
