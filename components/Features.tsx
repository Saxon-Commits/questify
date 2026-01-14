import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  colorClass: string; // e.g., 'group-hover:bg-sci-500/20'
  borderClass: string; // e.g., 'hover:border-sci-500'
  glowColor: string; // e.g., 'bg-sci-500/10'
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, colorClass, borderClass, glowColor }) => {
  return (
    <div className={`group p-6 bg-sci-800 rounded-xl border border-slate-700 ${borderClass} transition-all duration-300 relative overflow-hidden hover:shadow-lg hover:shadow-black/20`}>
      {/* Glow Effect */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${glowColor} rounded-full blur-2xl ${colorClass} transition-all duration-500`}></div>
      
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2 font-mono">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative z-10 bg-sci-900/50 border-t border-slate-800 py-24 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Productivity Meets RPG</h2>
          <p className="text-slate-400">Built for the completionist who hates boring to-do lists.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <FeatureCard 
            icon="⚔️"
            title="Bounty Board"
            description="Treat your tasks like contracts. Organize habits and projects into 'Bounties.' Complete them to earn Gold and XP."
            borderClass="hover:border-sci-500"
            colorClass="group-hover:bg-sci-500/20"
            glowColor="bg-sci-500/10"
          />

          <FeatureCard 
            icon="⏳"
            title="The Grindstone"
            description="A ruthless focus timer. If you tab away or get distracted, the timer fails and your loot is lost forever."
            borderClass="hover:border-sci-purple"
            colorClass="group-hover:bg-sci-purple/20"
            glowColor="bg-sci-purple/10"
          />

          <FeatureCard 
            icon="🌳"
            title="The Skill Tree"
            description="Don't just level up numbers. Unlock actual app utility like One-Click Templates and Advanced Charts by mastering your skills."
            borderClass="hover:border-green-500"
            colorClass="group-hover:bg-green-500/20"
            glowColor="bg-green-500/10"
          />

        </div>
      </div>
    </section>
  );
};