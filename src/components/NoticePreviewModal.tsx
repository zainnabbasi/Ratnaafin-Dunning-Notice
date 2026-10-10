import React, { useRef, useState } from 'react';
import { BorrowerRecord, MasterTemplate, NoticeLanguage, LetterheadConfig } from '../types';
import { RatnaafinLetterhead } from './RatnaafinLetterhead';
import { resolvePdfFilename } from '../utils/fileNaming';
import { downloadSinglePdf } from '../utils/pdfGenerator';
import { X, Download, Printer, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

interface NoticePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  borrower: BorrowerRecord | null;
  template: MasterTemplate;
  selectedMonth: string;
  language: NoticeLanguage;
  letterheadConfig?: LetterheadConfig;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const NoticePreviewModal: React.FC<NoticePreviewModalProps> = ({
  isOpen,
  onClose,
  borrower,
  template,
  selectedMonth,
  language,
  letterheadConfig,
  onNext,
  onPrev,
  hasPrev = false,
  hasNext = false,
}) => {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen || !borrower) return null;

  const { filename, isMissingEmail } = resolvePdfFilename(
    borrower.mailId,
    borrower.lanNumber
  );

  const handleDownload = async () => {
    if (!letterRef.current) return;
    try {
      setIsExporting(true);
      await downloadSinglePdf(letterRef.current, borrower.mailId, borrower.lanNumber);
    } catch (err) {
      console.error('Failed to export single notice PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {borrower.accountName}
                </h3>
                <span className="text-xs font-num text-slate-500">
                  (LAN: {borrower.lanNumber})
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500">Target PDF File:</span>
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded ${
                    isMissingEmail
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isMissingEmail ? (
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  )}
                  {filename}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="p-1.5 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Previous Notice"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="p-1.5 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Next Notice"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#046eb6] hover:bg-[#035b96] rounded-md shadow-xs transition-colors disabled:opacity-60"
            >
              {isExporting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scaled Preview Viewport */}
        <div className="flex-1 p-6 bg-slate-200 overflow-y-auto flex justify-center items-start">
          <div className="bg-white shadow-xl border border-slate-300">
            <div ref={letterRef}>
              <RatnaafinLetterhead
                borrower={borrower}
                template={template}
                selectedMonth={selectedMonth}
                language={language}
                scale={1}
                letterheadConfig={letterheadConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
