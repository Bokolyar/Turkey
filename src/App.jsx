import React from 'react';
import { HeroBlock } from './components/HeroBlock';
import { QuizBlock } from './components/QuizBlock';
import { ComparisonBlock } from './components/ComparisonBlock';
import { ExpertPicksBlock } from './components/ExpertPicksBlock';
import { TrustBlock } from './components/TrustBlock';
import { SocialProofBlock } from './components/SocialProofBlock';
import { FAQBlock } from './components/FAQBlock';

function App() {
  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans antialiased text-slate-900 bg-white">
      <HeroBlock onQuizClick={scrollToQuiz} />
      <QuizBlock />
      <ComparisonBlock />
      <ExpertPicksBlock onQuoteClick={scrollToQuiz} />
      <TrustBlock />
      <SocialProofBlock />
      <FAQBlock />
    </div>
  );
}

export default App;
