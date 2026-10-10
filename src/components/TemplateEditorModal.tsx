import React, { useState } from 'react';
import { MasterTemplate, BorrowerRecord, NoticeLanguage, LetterheadConfig } from '../types';
import { RatnaafinLetterhead } from './RatnaafinLetterhead';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { DEFAULT_ENGLISH_TEMPLATE, DEFAULT_GUJARATI_TEMPLATE } from '../data/templates';

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: MasterTemplate;
  onSave: (updated: MasterTemplate) => void;
  language: NoticeLanguage;
  sampleBorrower: BorrowerRecord;
  selectedMonth: string;
  letterheadConfig?: LetterheadConfig;
}

export const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({
  isOpen,
  onClose,
  template,
  onSave,
  language,
  sampleBorrower,
  selectedMonth,
  letterheadConfig,
}) => {
  const [formData, setFormData] = useState<MasterTemplate>({ ...template });

  if (!isOpen) return null;

  const placeholders = [
    { label: '{{Account Name}}', desc: 'Borrower Name' },
    { label: '{{New Lan Number}}', desc: 'Loan Account No' },
    { label: '{{Emi Amt}}', desc: 'Monthly EMI' },
    { label: '{{Total Overdue}}', desc: 'Overdue Amount' },
    { label: '{{EMI Due From}}', desc: 'Due Date' },
    { label: '{{Month}}', desc: 'Selected Month' },
  ];

  const handleReset = () => {
    if (language === 'en') {
      setFormData({ ...DEFAULT_ENGLISH_TEMPLATE });
    } else {
      setFormData({ ...DEFAULT_GUJARATI_TEMPLATE });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Master Document Editor — {language === 'en' ? 'English Format' : 'ગુજરાતી ફોર્મેટ'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize standard legal wording and manage variable insertion for the monthly dunning notices.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split Editor & Live Preview */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left: Form Fields (7 cols) */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-4 border-r border-slate-200">
            {/* Quick Variable Tag Bar */}
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
              <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#046eb6]" />
                Available Dynamic Mail Merge Variables:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {placeholders.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-slate-300 text-slate-800 shadow-2xs"
                    title={p.desc}
                  >
                    <code>{p.label}</code>
                    <span className="text-slate-400 text-[10px]">({p.desc})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Salutation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Salutation
              </label>
              <input
                type="text"
                value={formData.salutation}
                onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] focus:border-[#046eb6]"
              />
            </div>

            {/* Opening Paragraph */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Opening Paragraph (Loan Reference & Month Notice)
              </label>
              <textarea
                rows={4}
                value={formData.openingParagraph}
                onChange={(e) => setFormData({ ...formData, openingParagraph: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] focus:border-[#046eb6]"
              />
            </div>

            {/* Default Event Notice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Event of Default Clause
              </label>
              <textarea
                rows={3}
                value={formData.defaultEventParagraph}
                onChange={(e) =>
                  setFormData({ ...formData, defaultEventParagraph: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] focus:border-[#046eb6]"
              />
            </div>

            {/* Legal Warning Notice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Legal Proceedings Warning (7 Days Period)
              </label>
              <textarea
                rows={4}
                value={formData.legalWarningParagraph}
                onChange={(e) =>
                  setFormData({ ...formData, legalWarningParagraph: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] focus:border-[#046eb6]"
              />
            </div>

            {/* Disregard Clause */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Disregard if Already Paid Clause
              </label>
              <textarea
                rows={2}
                value={formData.disregardParagraph}
                onChange={(e) =>
                  setFormData({ ...formData, disregardParagraph: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] focus:border-[#046eb6]"
              />
            </div>

            {/* Signoff */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Signoff Greeting
                </label>
                <input
                  type="text"
                  value={formData.signoffGreeting}
                  onChange={(e) => setFormData({ ...formData, signoffGreeting: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] focus:border-[#046eb6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Signoff Entity Name
                </label>
                <input
                  type="text"
                  value={formData.signoffEntity}
                  onChange={(e) => setFormData({ ...formData, signoffEntity: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] focus:border-[#046eb6]"
                />
              </div>
            </div>
          </div>

          {/* Right: Scaled Preview (5 cols) */}
          <div className="lg:col-span-5 p-4 bg-slate-100 flex flex-col items-center justify-start overflow-y-auto">
            <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Live Scaled Letterhead Preview
            </div>
            <div className="w-[360px] h-[510px] bg-white shadow-lg border border-slate-300 overflow-hidden relative rounded-xs">
              <RatnaafinLetterhead
                borrower={sampleBorrower}
                template={formData}
                selectedMonth={selectedMonth}
                language={language}
                scale={0.45}
                letterheadConfig={letterheadConfig}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-3 text-center">
              Rendered with sample account: <br />
              <strong className="text-slate-600">{sampleBorrower.accountName}</strong>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default Legal Copy
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#046eb6] hover:bg-[#035b96] rounded-md shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              Save Master Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
