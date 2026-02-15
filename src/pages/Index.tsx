import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { parseSSCHtml } from '@/lib/parseSSCHtml';
import type { ScorecardData } from '@/lib/parseSSCHtml';
import { useToast } from '@/hooks/use-toast';
import HeroInput from '@/components/HeroInput';
import AnalyzingLoader from '@/components/AnalyzingLoader';
import ResultsHeader from '@/components/ResultsHeader';
import CandidateInfoCard from '@/components/CandidateInfoCard';
import TotalScoreCard from '@/components/TotalScoreCard';
import SectionBreakdown from '@/components/SectionBreakdown';
import QuestionAnalysis from '@/components/QuestionAnalysis';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [scorecard, setScorecard] = useState<ScorecardData | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setScorecard(null);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-ssc-html', {
        body: { url },
      });
      if (error || !data?.success) {
        toast({ title: 'Error', description: data?.error || error?.message || 'Failed to fetch', variant: 'destructive' });
        return;
      }
      const result = parseSSCHtml(data.html);
      setScorecard(result);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setScorecard(null);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AnalyzingLoader />
      </div>
    );
  }

  // Results state
  if (scorecard) {
    return (
      <div className="min-h-screen bg-background">
        <ResultsHeader data={scorecard} onBack={handleBack} />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          {/* Top row: Candidate Info + Total Score */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              {scorecard.candidateInfo && <CandidateInfoCard info={scorecard.candidateInfo} />}
            </div>
            <div className="lg:col-span-2">
              <TotalScoreCard data={scorecard} />
            </div>
          </div>
          <SectionBreakdown data={scorecard} />
          <QuestionAnalysis data={scorecard} />
        </div>
      </div>
    );
  }

  // Input state
  return (
    <div className="min-h-screen bg-background">
      <HeroInput onAnalyze={handleAnalyze} loading={loading} />
    </div>
  );
};

export default Index;
