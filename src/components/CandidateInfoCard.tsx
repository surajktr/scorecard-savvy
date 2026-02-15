import { User, BookOpen, MapPin, Calendar, Clock, FileText } from 'lucide-react';
import type { CandidateInfo } from '@/lib/parseSSCHtml';

interface CandidateInfoCardProps {
  info: CandidateInfo;
}

const fields = [
  { key: 'rollNumber' as const, label: 'ROLL NUMBER', icon: FileText },
  { key: 'candidateName' as const, label: 'CANDIDATE NAME', icon: User },
  { key: 'subject' as const, label: 'EXAM NAME', icon: BookOpen },
  { key: 'examDate' as const, label: 'EXAM DATE', icon: Calendar },
  { key: 'examTime' as const, label: 'SHIFT', icon: Clock },
  { key: 'venueName' as const, label: 'CENTRE', icon: MapPin },
];

const CandidateInfoCard = ({ info }: CandidateInfoCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <User className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">Candidate Information</h3>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {fields.map((f) => {
          const value = info[f.key];
          if (!value) return null;
          const Icon = f.icon;
          return (
            <div key={f.key} className="flex items-start gap-2.5">
              <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-medium text-muted-foreground tracking-wide">{f.label}</p>
                <p className="font-semibold text-foreground text-sm">{value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateInfoCard;
