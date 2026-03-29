import { useState, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import api from '../api/client';

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [ligandName, setLigandName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const viewerRef = useRef(null);
  const molViewer = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResults(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (ligandName) {
        formData.append('ligand_name', ligandName);
      }
      const res = await api.post('/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(res.data);
      
      if (window.$3Dmol && viewerRef.current) {
        viewerRef.current.innerHTML = '';
        molViewer.current = window.$3Dmol.createViewer(viewerRef.current, {
          defaultcolors: window.$3Dmol.rasmolElementColors
        });
        
        const reader = new FileReader();
        reader.onload = function(evt) {
          molViewer.current.addModel(evt.target.result, "pdb");
          molViewer.current.setStyle({}, { cartoon: { color: 'navy' } });
          if (res.data.analysis?.ligand) {
            molViewer.current.setStyle({ resn: res.data.analysis.ligand }, { stick: { colorscheme: 'pinkCarbon' }, sphere: { radius: 0.5 } });
          }
          molViewer.current.zoomTo();
          molViewer.current.render();
        };
        reader.readAsText(file);
      }
    } catch (err) {
      alert(err.response?.data?.detail || 'Analysis failed. Check your file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto p-4 sm:p-8 space-y-8 pb-24">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-sora font-bold tracking-tight text-navy">MolAnalyst</h1>
        <nav className="flex gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => window.open('https://github.com/molanalyst')}>Docs</Button>
          <Button variant="secondary" onClick={() => window.location.href='/login'}>Sign in</Button>
        </nav>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-4 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Structure Loader</CardTitle>
            <CardDescription>Upload a `.pdb` file containing protein and ligand.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-grow">
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-400 bg-ice/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue hover:bg-ice transition-colors flex-grow cursor-pointer"
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input 
                id="file-upload" 
                type="file" 
                accept=".pdb" 
                onChange={(e) => setFile(e.target.files?.[0])} 
                className="hidden" 
              />
              <div className="text-blue mb-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p className="font-normal font-inter text-slate-900">{file ? file.name : "Drop your PDB file here"}</p>
              <p className="text-sm text-slate-500 mt-1">{file ? "File selected" : "or click to browse"}</p>
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-900 block text-left">Target Ligand Name (Optional)</label>
              <Input 
                placeholder="e.g. LIG, UNL, ATP" 
                value={ligandName} 
                onChange={(e) => setLigandName(e.target.value.toUpperCase())}
              />
            </div>
            
            <Button onClick={handleAnalyze} disabled={!file || loading} className="w-full mt-2">
              {loading ? "Computing Analysis..." : "Run Analysis"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-8 bg-navy text-white overflow-hidden min-h-[500px] flex flex-col relative border-none">
          <div className="p-4 border-b border-white/10 flex justify-between items-center z-10 bg-navy/80 backdrop-blur">
            <h3 className="font-inter font-medium text-white">Structure Viewer</h3>
            {results?.analysis?.ligand && (
              <span className="text-xs font-jetbrains bg-blue/20 text-blue px-2 py-1 rounded">Ligand: {results.analysis.ligand}</span>
            )}
          </div>
          <div className="flex-grow w-full h-full min-h-[450px]" ref={viewerRef}>
            {!results && !loading && (
              <div className="flex items-center justify-center h-full text-slate-400 font-inter text-sm">
                Upload a structure to view
              </div>
            )}
          </div>
        </Card>
      </div>

      {results && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
              <CardTitle>AI Binding Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-slate max-w-none text-[15px] font-inter leading-relaxed whitespace-pre-wrap">
                {results.ai_summary}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Interaction Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center">
                  <span className="text-3xl font-sora font-bold text-cyan">{results.analysis.h_bonds_count}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">H-Bonds</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center">
                  <span className="text-3xl font-sora font-bold text-amber">{results.analysis.hydrophobic_count}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">Hydrophobic</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center">
                  <span className="text-3xl font-sora font-bold text-blue">{results.analysis.pi_stacking_count}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">π-Stacking</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center">
                  <span className="text-3xl font-sora font-bold text-emerald">{results.analysis.electrostatic_count}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">Electrostatic</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
