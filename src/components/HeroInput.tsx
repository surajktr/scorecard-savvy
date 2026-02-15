import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, BarChart3, Download, Search } from 'lucide-react';

interface HeroInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

const CATEGORIES = [
  { value: 'ssc', label: 'SSC Exams', icon: '🏛️' },
  { value: 'railway', label: 'Railway Exams', icon: '🚂' },
  { value: 'ib', label: 'Intelligence Bureau', icon: '🕵️' },
  { value: 'bank', label: 'Bank Exams', icon: '🏦' },
  { value: 'police', label: 'Police Exams', icon: '👮' },
];

const SSC_EXAMS = [
  { value: 'cgl-1', label: 'SSC CGL Tier-I', color: 'bg-emerald-400' },
  { value: 'cgl-2', label: 'SSC CGL Tier-II', color: 'bg-emerald-500' },
  { value: 'chsl-1', label: 'SSC CHSL Tier-I', color: 'bg-purple-400' },
  { value: 'chsl-2', label: 'SSC CHSL Tier-II', color: 'bg-purple-500' },
  { value: 'cpo-1', label: 'SSC CPO Paper-I', color: 'bg-blue-400' },
  { value: 'cpo-2', label: 'SSC CPO Paper-II', color: 'bg-blue-500' },
  { value: 'mts', label: 'SSC MTS', color: 'bg-orange-400' },
  { value: 'gd', label: 'SSC GD', color: 'bg-amber-700' },
  { value: 'steno', label: 'SSC Steno', color: 'bg-rose-400' },
];

const HeroInput = ({ onAnalyze, loading }: HeroInputProps) => {
  const [category, setCategory] = useState('ssc');
  const [exam, setExam] = useState('cgl-2');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url.trim()) onAnalyze(url.trim());
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-muted/40 to-background">
      {/* Title */}
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 leading-tight">
          Analyze Your{' '}
          <span className="text-primary">Response Sheet</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Get detailed score analysis, section-wise breakdown, and question-level insights
          from your SSC CGL response sheet in seconds.
        </p>
      </div>

      {/* Selectors */}
      <div className="w-full max-w-3xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-card h-12">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  <span className="flex items-center gap-2">
                    <span>{c.icon}</span> {c.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={exam} onValueChange={setExam}>
            <SelectTrigger className="bg-card h-12">
              <SelectValue placeholder="Select Exam" />
            </SelectTrigger>
            <SelectContent>
              {SSC_EXAMS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  <span className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${e.color}`} />
                    {e.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* URL Input */}
        <div className="flex gap-3 items-center bg-card border border-border rounded-xl px-4 py-2 shadow-sm">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <Input
            placeholder="Paste your SSC response sheet URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="border-0 shadow-none focus-visible:ring-0 h-12 text-base"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading || !url.trim()}
            size="lg"
            className="shrink-0 rounded-xl px-8"
          >
            Analyze
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 max-w-3xl w-full">
        {[
          { icon: FileText, title: 'Extract Data', desc: 'Automatically extract all question and answer data from your response sheet.' },
          { icon: BarChart3, title: 'Detailed Analytics', desc: 'Get section-wise breakdown with accuracy and attempt rate analysis.' },
          { icon: Download, title: 'Download PDF', desc: 'Generate a comprehensive PDF report with all sections and questions.' },
        ].map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
              <f.icon className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroInput;
