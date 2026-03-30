import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FlaskConical, Download, Layers } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-ice">
      {/* Navigation */}
      <nav className="w-full max-w-7xl px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-navy" />
          <span className="text-xl font-bold font-sora tracking-tight text-navy">MolAnalyst</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-navy font-medium text-[15px] hover:underline underline-offset-4">Log in</Link>
          <Link to="/analyze">
            <Button variant="primary" size="sm">Start Analysis</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-6 py-24 z-10">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-navy leading-[1.1] tracking-tight">
            From PDB to insight, <br className="hidden md:block" />
            <span className="text-electric">in seconds.</span>
          </h1>
          <p className="text-[18px] md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The free, browser-based binding analysis tool built for every lab. Upload a PDB file to map hydrogen bonds, hydrophobic contacts, and binding pockets instantly.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Link to="/analyze">
              <Button size="lg" className="w-[180px] group">
                <FlaskConical className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Analyzing
              </Button>
            </Link>
            <Link to="/analyze">
              <Button variant="secondary" size="lg" className="w-[180px]">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-32 w-full">
          {[
            {
              title: "Precise Mapping",
              desc: "Automatically detect and classify interaction types including H-bonds, π-stacking, and hydrophobic contacts.",
              icon: <Layers className="h-6 w-6 text-electric" />
            },
            {
              title: "AI-Powered Summaries",
              desc: "Get a structured scientific interpretation of the binding profile powered by generative AI.",
              icon: <FlaskConical className="h-6 w-6 text-electric" />
            },
            {
              title: "Export & Share",
              desc: "Download complete HTML reports or raw JSON data to integrate with downstream workflows.",
              icon: <Download className="h-6 w-6 text-electric" />
            }
          ].map((feature, i) => (
             <div key={i} className="flex flex-col items-center text-center p-6 space-y-4">
               <div className="h-12 w-12 rounded-xl bg-electric/10 flex items-center justify-center">
                 {feature.icon}
               </div>
               <h3 className="text-lg font-semibold text-navy">{feature.title}</h3>
               <p className="text-slate-600 leading-relaxed text-[15px]">
                 {feature.desc}
               </p>
             </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
