import React, { useState, useRef, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {
  BorrowerRecord,
  MasterTemplate,
  NoticeLanguage,
  BatchGenerationProgress,
  LetterheadConfig,
  DEFAULT_LETTERHEAD_CONFIG,
  DEFAULT_LETTERHEAD_URL,
} from './types';
import { INITIAL_SAMPLE_RECORDS, parseCSV, RAW_CSV_DATA } from './data/sampleDataset';
import {
  DEFAULT_ENGLISH_TEMPLATE,
  DEFAULT_GUJARATI_TEMPLATE,
  MONTH_NAMES,
} from './data/templates';
import { RatnaafinLetterhead } from './components/RatnaafinLetterhead';
import { RatnaafinLogo } from './components/RatnaafinLogo';
import { BorrowerTable } from './components/BorrowerTable';
import { NoticePreviewModal } from './components/NoticePreviewModal';
import { TemplateEditorModal } from './components/TemplateEditorModal';
import { LetterheadUploaderModal } from './components/LetterheadUploaderModal';
import { BatchProgressModal } from './components/BatchProgressModal';
import { generateBatchZip, downloadSinglePdf } from './utils/pdfGenerator';
import { resolvePdfFilename } from './utils/fileNaming';
import {
  Upload,
  FileSpreadsheet,
  Download,
  Settings,
  Languages,
  RotateCcw,
  FileText,
  MailCheck,
  AlertCircle,
  Calendar,
  Building2,
  ExternalLink,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

export default function App() {
  // Application State
  const [records, setRecords] = useState<BorrowerRecord[]>(INITIAL_SAMPLE_RECORDS);
  const [selectedMonth, setSelectedMonth] = useState<string>('September');
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [language, setLanguage] = useState<NoticeLanguage>('en');

  // Master Templates
  const [englishTemplate, setEnglishTemplate] = useState<MasterTemplate>(
    DEFAULT_ENGLISH_TEMPLATE
  );
  const [gujaratiTemplate, setGujaratiTemplate] = useState<MasterTemplate>(
    DEFAULT_GUJARATI_TEMPLATE
  );

  // Active Template
  const currentTemplate = language === 'en' ? englishTemplate : gujaratiTemplate;

  // Master Letterhead Config (Official JPG Background & Margins Default)
  const [letterheadConfig, setLetterheadConfig] = useState<LetterheadConfig>(() => {
    try {
      const saved = localStorage.getItem('ratnaafin_letterhead_config_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.backgroundImage) return parsed;
      }
    } catch (_) {}
    return DEFAULT_LETTERHEAD_CONFIG;
  });

  const handleUpdateLetterheadConfig = (newConfig: LetterheadConfig) => {
    setLetterheadConfig(newConfig);
    try {
      localStorage.setItem('ratnaafin_letterhead_config_v2', JSON.stringify(newConfig));
    } catch (_) {}
  };

  // Modals state
  const [previewBorrowerIndex, setPreviewBorrowerIndex] = useState<number | null>(null);
  const [isTemplateEditorOpen, setIsTemplateEditorOpen] = useState(false);
  const [isLetterheadModalOpen, setIsLetterheadModalOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);

  // Batch Generation State
  const [batchProgress, setBatchProgress] = useState<BatchGenerationProgress>({
    isGenerating: false,
    current: 0,
    total: 0,
    status: 'idle',
  });
  const cancelBatchRef = useRef<boolean>(false);

  // Offscreen render target reference
  const offscreenContainerRef = useRef<HTMLDivElement>(null);
  const [offscreenBorrower, setOffscreenBorrower] = useState<BorrowerRecord | null>(null);

  // Upload file ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Summary Metrics
  const summaryMetrics = useMemo(() => {
    let totalOd = 0;
    let validEmails = 0;
    let missingEmails = 0;

    for (const r of records) {
      const numOd = parseFloat(String(r.totalOverdue).replace(/[^0-9.-]+/g, '')) || 0;
      totalOd += numOd;

      const { isMissingEmail } = resolvePdfFilename(r.mailId, r.lanNumber);
      if (isMissingEmail) {
        missingEmails++;
      } else {
        validEmails++;
      }
    }

    return {
      totalCount: records.length,
      totalOverdueFormatted: totalOd.toLocaleString('en-IN'),
      validEmails,
      missingEmails,
    };
  }, [records]);

  // Handle Excel or CSV file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.csv')) {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const parsed = parseCSV(text);
          if (parsed.length > 0) {
            setRecords(parsed);
          }
        }
      };
      reader.readAsText(file);
    } else {
      // Excel file (.xlsx, .xls)
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const csvString = XLSX.utils.sheet_to_csv(sheet);
        const parsed = parseCSV(csvString);
        if (parsed.length > 0) {
          setRecords(parsed);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Reload default sample data
  const handleReloadSampleData = () => {
    setRecords(INITIAL_SAMPLE_RECORDS);
  };

  // Download state and toast
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Render DOM node for batch processing
  const renderBorrowerForBatch = (borrower: BorrowerRecord): Promise<HTMLElement> => {
    return new Promise((resolve) => {
      setOffscreenBorrower(borrower);
      // Wait for React commit and DOM layout
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (offscreenContainerRef.current) {
            resolve(offscreenContainerRef.current);
          }
        }, 90);
      });
    });
  };

  // Single download action from table
  const handleDownloadSingle = async (borrower: BorrowerRecord) => {
    try {
      setDownloadingId(borrower.id);
      const el = await renderBorrowerForBatch(borrower);
      const { filename } = await downloadSinglePdf(el, borrower.mailId, borrower.lanNumber);
      showToast(`Downloaded ${filename} successfully!`, 'success');
    } catch (err: unknown) {
      console.error('Error generating single notice:', err);
      const msg = err instanceof Error ? err.message : 'Download failed';
      showToast(`Error creating PDF: ${msg}`, 'error');
    } finally {
      setDownloadingId(null);
    }
  };

  // Trigger Bulk Generation & ZIP Download
  const handleStartBatchZip = async () => {
    if (records.length === 0) return;

    cancelBatchRef.current = false;
    setBatchProgress({
      isGenerating: true,
      current: 0,
      total: records.length,
      status: 'generating',
    });

    try {
      const result = await generateBatchZip({
        borrowers: records,
        template: currentTemplate,
        selectedMonth,
        language,
        renderBorrowerDom: renderBorrowerForBatch,
        onProgress: (current, total, name) => {
          setBatchProgress((prev) => ({
            ...prev,
            current,
            total,
            currentAccountName: name,
          }));
        },
        checkCancelled: () => cancelBatchRef.current,
      });

      const blobUrl = URL.createObjectURL(result.zipBlob);
      setBatchProgress((prev) => ({
        ...prev,
        status: 'completed',
        isGenerating: false,
        downloadUrl: blobUrl,
        downloadFilename: result.zipFilename,
      }));
      showToast(`Generated and packaged ${records.length} notices into ZIP!`, 'success');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error generating batch';
      setBatchProgress((prev) => ({
        ...prev,
        status: 'error',
        isGenerating: false,
        errorMessage: errorMsg,
      }));
      showToast(errorMsg, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* 1. TOP BAR CONTRACT: Brand | Nav Links | Primary Action */}
      <header className="flex items-center justify-between gap-6 px-6 md:px-8 py-3 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        {/* Brand Zone */}
        <div className="flex items-center gap-3.5 whitespace-nowrap shrink-0">
          <RatnaafinLogo size="md" showTagline={true} />
          <span className="hidden sm:inline text-xs text-slate-400 font-medium border-l border-slate-200 pl-3">
            Dunning Notice Mail Merge
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setIsLetterheadModalOpen(true)}
            className="hover:text-[#046eb6] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Official Letterhead
            <span className="text-[10px] bg-blue-100 text-[#046eb6] px-1.5 py-0.2 rounded font-mono font-bold">
              Active
            </span>
          </button>
          <button
            onClick={() => setIsTemplateEditorOpen(true)}
            className="hover:text-[#046eb6] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            Master Templates ({language === 'en' ? 'English' : 'ગુજરાતી'})
          </button>
          <button
            onClick={() => {
              if (records.length > 0) setPreviewBorrowerIndex(0);
            }}
            className="hover:text-[#046eb6] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Live Letterhead Inspector
          </button>
          <button
            onClick={() => setIsDocumentationOpen(true)}
            className="hover:text-[#046eb6] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            Workflow Guide
          </button>
        </nav>

        {/* Primary Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleStartBatchZip}
            disabled={batchProgress.isGenerating || records.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#046eb6] hover:bg-[#035b96] rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Generate All & Download ZIP ({records.length})
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE VIEWPORT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6">
        {/* CONTROL DECK & CONFIGURATION BAR */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Month & Year Selection (4 cols) */}
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-[#046eb6]">
                <Calendar className="w-5 h-5 text-[#046eb6]" />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Dunning Notice Month
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#046eb6]"
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m.value} value={m.value}>
                        {language === 'gu' ? m.labelGu : m.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-24 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#046eb6]"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Language Selection Segmented Control (3 cols) */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Document Language Format
              </label>
              <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    language === 'en'
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English Notice
                </button>
                <button
                  onClick={() => setLanguage('gu')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all font-gujarati ${
                    language === 'gu'
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ગુજરાતી નોટિસ
                </button>
              </div>
            </div>

            {/* Excel Upload & Sample Buttons (5 cols) */}
            <div className="md:col-span-5 flex items-center justify-end gap-2.5 pt-2 md:pt-0">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => setIsLetterheadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors shadow-2xs bg-blue-50/80 text-[#046eb6] border-blue-200 hover:bg-blue-100/70"
                title="Manage official master letterhead background and margin clearances"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#046eb6]" />
                Official Letterhead Active
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                title="Upload Excel (.xlsx/.xls) or CSV file with monthly borrower records"
              >
                <Upload className="w-3.5 h-3.5 text-[#046eb6]" />
                Upload New Excel/CSV
              </button>

              <button
                onClick={handleReloadSampleData}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                title="Reload the 100 borrower sample dataset provided by Ratnaafin"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reload 100 Sample
              </button>

              <button
                onClick={() => setIsTemplateEditorOpen(true)}
                className="p-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                title="Edit Master Document text"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY STATISTIC STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Total Accounts in Batch
            </div>
            <div className="text-2xl font-bold font-num text-slate-900 mt-1">
              {summaryMetrics.totalCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Ready for single or ZIP export
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Total Overdue Sum
            </div>
            <div className="text-2xl font-bold font-num text-slate-900 mt-1">
              ₹{summaryMetrics.totalOverdueFormatted}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Aggregated across all entries
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Auto-Named by Email
            </div>
            <div className="text-2xl font-bold font-num text-emerald-700 mt-1">
              {summaryMetrics.validEmails}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Exact recipient mail ID format
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Missing Email Fallback
            </div>
            <div className="text-2xl font-bold font-num text-amber-700 mt-1">
              {summaryMetrics.missingEmails}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Labeled with LAN Number marker
            </div>
          </div>
        </div>

        {/* BORROWER DATASET & BATCH TABLE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Borrower Dunning Notice Ledger
              </h2>
              <p className="text-xs text-slate-500">
                Each notice will be generated on authentic Ratnaafin letterhead and auto-named by recipient email.
              </p>
            </div>

            <div className="text-xs text-slate-500 hidden sm:block">
              Notice Month: <strong className="text-slate-800">{selectedMonth} {selectedYear}</strong> · Language: <strong className="text-slate-800">{language === 'en' ? 'English' : 'ગુજરાતી'}</strong>
            </div>
          </div>

          <BorrowerTable
            records={records}
            onPreview={(record) => {
              const idx = records.findIndex((r) => r.id === record.id);
              setPreviewBorrowerIndex(idx >= 0 ? idx : 0);
            }}
            onDownloadSingle={handleDownloadSingle}
            downloadingId={downloadingId}
          />
        </div>
      </main>

      {/* 3. MODALS & PREVIEW ENGINES */}

      {/* Single Notice Preview Modal */}
      {previewBorrowerIndex !== null && records[previewBorrowerIndex] && (
        <NoticePreviewModal
          isOpen={previewBorrowerIndex !== null}
          onClose={() => setPreviewBorrowerIndex(null)}
          borrower={records[previewBorrowerIndex]}
          template={currentTemplate}
          selectedMonth={selectedMonth}
          language={language}
          letterheadConfig={letterheadConfig}
          hasPrev={previewBorrowerIndex > 0}
          hasNext={previewBorrowerIndex < records.length - 1}
          onPrev={() => setPreviewBorrowerIndex((i) => (i !== null ? Math.max(0, i - 1) : 0))}
          onNext={() =>
            setPreviewBorrowerIndex((i) =>
              i !== null ? Math.min(records.length - 1, i + 1) : 0
            )
          }
        />
      )}

      {/* Master Template Editor Modal */}
      <TemplateEditorModal
        isOpen={isTemplateEditorOpen}
        onClose={() => setIsTemplateEditorOpen(false)}
        template={currentTemplate}
        language={language}
        sampleBorrower={records[0] || INITIAL_SAMPLE_RECORDS[0]}
        selectedMonth={selectedMonth}
        letterheadConfig={letterheadConfig}
        onSave={(updated) => {
          if (language === 'en') {
            setEnglishTemplate(updated);
          } else {
            setGujaratiTemplate(updated);
          }
        }}
      />

      {/* Master Letterhead JPG Uploader & Customizer Modal */}
      <LetterheadUploaderModal
        isOpen={isLetterheadModalOpen}
        onClose={() => setIsLetterheadModalOpen(false)}
        config={letterheadConfig}
        onChangeConfig={handleUpdateLetterheadConfig}
        sampleBorrower={records[0] || INITIAL_SAMPLE_RECORDS[0]}
        template={currentTemplate}
        selectedMonth={selectedMonth}
        language={language}
      />

      {/* Batch Generation & ZIP Download Progress Modal */}
      <BatchProgressModal
        progress={batchProgress}
        onCancel={() => {
          cancelBatchRef.current = true;
        }}
        onClose={() =>
          setBatchProgress({
            isGenerating: false,
            current: 0,
            total: 0,
            status: 'idle',
          })
        }
        language={language}
      />

      {/* Documentation & Help Modal */}
      {isDocumentationOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Ratnaafin Dunning Notice Automation Guide
              </h3>
              <button
                onClick={() => setIsDocumentationOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  1. The 6 Dynamic Variables Injected:
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code>{'{{New Lan Number}}'}</code>: Loan account identifier (e.g. <code>001-017-401-000180</code>)</li>
                  <li><code>{'{{Account Name}}'}</code>: Borrower full name (e.g. <code>Vaghela Bhanubhai Gotabhai</code>)</li>
                  <li><code>{'{{Emi Amt}}'}</code>: Monthly installment in ₹ (e.g. <code>4400</code>)</li>
                  <li><code>{'{{Total Overdue}}'}</code>: Total overdue amount in ₹ (e.g. <code>8800</code>)</li>
                  <li><code>{'{{EMI Due From}}'}</code>: Date from which EMI is overdue (e.g. <code>05-09-2026</code>)</li>
                  <li><code>{'{{Month}}'}</code>: Dynamically selected month for the run (e.g. <code>September</code>)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  2. Automatic PDF Naming Rules:
                </h4>
                <p>
                  Every generated PDF is strictly named by the email address extracted from the Excel column:
                  <br />
                  <code className="text-[#046eb6] font-semibold">bhanuvaghela99@gmail.com.pdf</code>
                  <br />
                  For accounts with missing, empty, or #N/A emails, the file is safely named:
                  <br />
                  <code className="text-amber-800 font-semibold">MISSING_EMAIL_001-005-401-000038.pdf</code>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  3. Master JPG Background Support:
                </h4>
                <p>
                  Click <strong>"Master Letterhead JPG"</strong> to upload any high-resolution JPG/PNG scan of your company letterhead. When active, all notices overlay onto that exact image without duplicating headers or footers, and margins can be tuned directly to align with your letterhead.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  4. Bulk ZIP Download:
                </h4>
                <p>
                  Clicking <strong>"Generate All & Download ZIP"</strong> produces individual PDFs for every row in your uploaded spreadsheet, bundles them together, and triggers a single ZIP download named <code>Ratnaafin_Dunning_Notices_September_EN_100_Accounts.zip</code>.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsDocumentationOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold bg-slate-900 text-white animate-fade-in border border-slate-700">
          <div
            className={`w-2 h-2 rounded-full ${
              toastMessage.type === 'success' ? 'bg-emerald-400' : 'bg-rose-400'
            }`}
          />
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* OFFSCREEN CONTAINER FOR HIGH-RES PDF EXPORT (Positive DOM coordinates, hidden behind canvas) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '794px',
          height: '1123px',
          zIndex: -9999,
          pointerEvents: 'none',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          visibility: 'visible',
        }}
        aria-hidden="true"
      >
        <div ref={offscreenContainerRef}>
          {offscreenBorrower && (
            <RatnaafinLetterhead
              borrower={offscreenBorrower}
              template={currentTemplate}
              selectedMonth={selectedMonth}
              language={language}
              scale={1}
              letterheadConfig={letterheadConfig}
            />
          )}
        </div>
      </div>
    </div>
  );
}
