import React from 'react';
import { BatchGenerationProgress } from '../types';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface BatchProgressModalProps {
  progress: BatchGenerationProgress;
  onCancel: () => void;
  onClose: () => void;
  language: string;
}

export const BatchProgressModal: React.FC<BatchProgressModalProps> = ({
  progress,
  onCancel,
  onClose,
  language,
}) => {
  if (!progress.isGenerating && progress.status === 'idle') return null;

  const percentage =
    progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {progress.status === 'generating' && (
              <Loader2 className="w-5 h-5 text-[#046eb6] animate-spin" />
            )}
            {progress.status === 'zipping' && (
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            )}
            {progress.status === 'completed' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            )}
            {progress.status === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            )}
            <h3 className="text-base font-bold text-slate-900">
              {progress.status === 'generating' && 'Generating Dunning Notices...'}
              {progress.status === 'zipping' && 'Compressing into ZIP Archive...'}
              {progress.status === 'completed' && 'Batch Generation Complete!'}
              {progress.status === 'error' && 'Generation Interrupted'}
            </h3>
          </div>

          {(progress.status === 'completed' || progress.status === 'error') && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span>
              {progress.status === 'zipping'
                ? 'Building ZIP package...'
                : `Processing notice ${progress.current} of ${progress.total}`}
            </span>
            <span className="font-num font-bold text-slate-900">{percentage}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-150 rounded-full overflow-hidden bg-slate-100">
            <div
              className={`h-full transition-all duration-150 rounded-full ${
                progress.status === 'completed'
                  ? 'bg-emerald-500'
                  : progress.status === 'error'
                  ? 'bg-rose-500'
                  : 'bg-[#046eb6]'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Live Status Detail */}
        {progress.status === 'generating' && progress.currentAccountName && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs mb-5">
            <div className="text-slate-500">Currently rendering letterhead for:</div>
            <div className="font-semibold text-slate-900 truncate mt-0.5">
              {progress.currentAccountName}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Language format: {language === 'en' ? 'English' : 'ગુજરાતી'}
            </div>
          </div>
        )}

        {progress.status === 'zipping' && (
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-xs text-indigo-900 mb-5">
            Packaging all rendered PDF files with exact email file names into your download package.
          </div>
        )}

        {progress.status === 'completed' && (
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-900 mb-5">
            All <strong className="font-num">{progress.total}</strong> notices were successfully
            rendered on Ratnaafin letterhead, auto-named by recipient email addresses, and downloaded as a ZIP archive.
          </div>
        )}

        {progress.status === 'error' && (
          <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 text-xs text-rose-900 mb-5">
            {progress.errorMessage || 'An unexpected error occurred during batch generation.'}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div>
            {progress.status === 'completed' && progress.downloadUrl && (
              <a
                href={progress.downloadUrl}
                download={progress.downloadFilename || 'Ratnaafin_Notices.zip'}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors border border-emerald-300"
              >
                <span>📥 Re-download ZIP Package</span>
              </a>
            )}
          </div>

          <div className="flex gap-2">
            {progress.status === 'generating' && (
              <button
                onClick={onCancel}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
              >
                Cancel Process
              </button>
            )}

            {(progress.status === 'completed' || progress.status === 'error') && (
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
