import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  const bgStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100',
    error: 'bg-rose-950/90 border-rose-500/40 text-rose-100',
    info: 'bg-kizunaa-navy-900/90 border-amber-400/40 text-white',
  }[type] || 'bg-kizunaa-navy-900/90 border-amber-400/40 text-white';

  const icon = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-400 shrink-0" />,
  }[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slideUp">
      <div className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-2xl ${bgStyles}`}>
        {icon}
        <p className="text-xs sm:text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
