import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CustomCursor } from '../components/CustomCursor';
import { ThemeToggle } from '../components/ThemeToggle';
import { SectionDivider } from '../components/SectionDivider';
import { HeroBlock } from '../components/HeroBlock';
import { QuizBlock } from '../components/QuizBlock';
import { ComparisonBlock } from '../components/ComparisonBlock';
import { ExpertPicksBlock } from '../components/ExpertPicksBlock';
import { TrustBlock } from '../components/TrustBlock';
import { SocialProofBlock } from '../components/SocialProofBlock';
import { FAQBlock } from '../components/FAQBlock';

export function LandingPage() {
    const [data, setData] = useState(null);
    const [isDark, setIsDark] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        // Initialize theme from system or local storage if needed
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
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

    const revealVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="font-sans antialiased bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-teal-500/30">
            <CustomCursor />
            <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />

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

            {data.HeroBlock?.visible && (
                <HeroBlock data={data.HeroBlock} onQuizClick={scrollToQuiz} />
            )}

            {data.QuizBlock?.visible && (
                <motion.section
                    id="quiz"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealVariants}
                >
                    <SectionDivider color="#0f172a" className="bg-white dark:bg-[#0f172a]" />
                    <QuizBlock data={data.QuizBlock} />
                </motion.section>
            )}

            {data.ComparisonBlock?.visible && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealVariants}
                >
                    <ComparisonBlock data={data.ComparisonBlock} />
                </motion.section>
            )}

            {data.ExpertPicksBlock?.visible && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealVariants}
                >
                    <SectionDivider variant="curve" color="#f8fafc" className="bg-white dark:bg-slate-800" />
                    <ExpertPicksBlock data={data.ExpertPicksBlock} onQuoteClick={scrollToQuiz} />
                </motion.section>
            )}

            {data.TrustBlock?.visible && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealVariants}
                >
                    <TrustBlock data={data.TrustBlock} />
                </motion.section>
            )}

            {data.SocialProofBlock?.visible && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealVariants}
                >
                    <SocialProofBlock data={data.SocialProofBlock} />
                </motion.section>
            )}

            {data.FAQBlock?.visible && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={revealVariants}
                >
                    <FAQBlock data={data.FAQBlock} />
                </motion.section>
            )}
        </div>
    );
}
