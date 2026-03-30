import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Layers, Search, Grid, List as ListIcon } from 'lucide-react';

const Dashboard = () => {
  const [analyses, setAnalyses] = useState([]);

  // Mock fetching history
  useEffect(() => {
    setAnalyses([
      { id: 1, label: "HIV Protease Analysis", pdb: "1hsg.pdb", ligand: "IND", date: "2 days ago", stats: "H:5 Hy:3 π:1" },
      { id: 2, label: "COVID Mpro Study", pdb: "6lu7.pdb", ligand: "N3", date: "5 days ago", stats: "H:8 Hy:4 π:0" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-ice font-inter flex text-slate-900">
      
      {/* Sidebar Layout */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center space-x-2 mb-10">
          <Layers className="h-6 w-6 text-navy" />
          <span className="text-xl font-bold font-sora tracking-tight text-navy">MolAnalyst</span>
        </div>
        
        <div className="flex items-center space-x-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-electric text-white flex items-center justify-center font-bold">AS</div>
          <div>
            <p className="font-semibold text-sm">Dr. Ana Silva</p>
            <p className="text-xs text-slate-500">user@lab.edu</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-electric/10 text-electric font-medium">
            <span className="text-sm">My Analyses</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">
            <span className="text-sm">Profile & Settings</span>
          </Link>
        </nav>

        <Link to="/analyze">
          <Button className="w-full">New Analysis →</Button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-sora tracking-tight font-semibold text-navy">My Analyses</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric"
              />
            </div>
            <div className="flex items-center bg-slate-100 p-1 rounded-lg">
              <button className="p-1.5 bg-white shadow-sm rounded-md"><Grid className="w-4 h-4 text-slate-700" /></button>
              <button className="p-1.5"><ListIcon className="w-4 h-4 text-slate-400" /></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {analyses.map(analysis => (
            <div key={analysis.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-electric/50 transition-colors">
              <div className="h-2 w-full bg-gradient-to-r from-electric to-cyan-accent" />
              <div className="p-5 flex-1 select-none">
                <h3 className="font-semibold text-navy truncate mb-1" title={analysis.label}>{analysis.label}</h3>
                <p className="text-xs font-jetbrains text-slate-500 mb-3">{analysis.pdb}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium uppercase tracking-wider">{analysis.ligand}</span>
                  <span className="text-xs font-medium text-slate-400">{analysis.stats}</span>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400">{analysis.date}</p>
                <Link to={`/analyze`}><Button size="sm" variant="ghost" className="h-8 group-hover:bg-electric/5">Open →</Button></Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
