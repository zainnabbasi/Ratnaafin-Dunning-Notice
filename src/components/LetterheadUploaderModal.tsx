import React, { useRef } from 'react';
import {
  LetterheadConfig,
  BorrowerRecord,
  MasterTemplate,
  NoticeLanguage,
  DEFAULT_LETTERHEAD_CONFIG,
  DEFAULT_LETTERHEAD_URL,
} from '../types';
import { RatnaafinLetterhead } from './RatnaafinLetterhead';
import { X, Upload, Sliders, Check, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface LetterheadUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LetterheadConfig;
  onChangeConfig: (newConfig: LetterheadConfig) => void;
  sampleBorrower: BorrowerRecord;
  template: MasterTemplate;
  selectedMonth: string;
  language: NoticeLanguage;
}

export const LetterheadUploaderModal: React.FC<LetterheadUploaderModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  sampleBorrower,
  template,
  selectedMonth,
  language,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isDefaultLetterhead =
    config.backgroundImage === DEFAULT_LETTERHEAD_URL ||
    config.backgroundImage === '/default_letterhead.jpg';
  const isCodedVector =
    config.backgroundImage === null || config.backgroundImage === 'coded';
  const isCustomUploaded = !isDefaultLetterhead && !isCodedVector;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChangeConfig({
          ...config,
          backgroundImage: dataUrl,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    onChangeConfig({
      ...DEFAULT_LETTERHEAD_CONFIG,
    });
  };

  const handleSwitchToCoded = () => {
    onChangeConfig({
      ...config,
      backgroundImage: 'coded',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-[#046eb6] rounded-lg">
              <ImageIcon className="w-5 h-5 text-[#046eb6]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Ratnaafin Letterhead & Margins
              </h2>
              <p className="text-xs text-slate-500">
                Official Ratnaafin high-resolution A4 letterhead is active by default. You can adjust margins or upload a custom letterhead scan.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Split Controls & Live Scaled Preview */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Controls (6 cols) */}
          <div className="lg:col-span-6 p-6 overflow-y-auto space-y-5 border-r border-slate-200">
            {/* Status Card */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                1. Letterhead Source
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageFile}
                className="hidden"
              />

              {isDefaultLetterhead && (
                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-white border border-blue-300 rounded shadow-xs overflow-hidden shrink-0">
                      <img
                        src={DEFAULT_LETTERHEAD_URL}
                        alt="Default Letterhead"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.currentTarget.src = '/default_letterhead.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#046eb6] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-[#046eb6]" />
                        Official Ratnaafin Letterhead Active (Default)
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        High-resolution A4 master background from CDN.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 text-xs font-semibold text-[#046eb6] bg-white border border-blue-300 rounded-md hover:bg-blue-50 transition-colors shadow-2xs"
                    >
                      Upload Custom
                    </button>
                  </div>
                </div>
              )}

              {isCustomUploaded && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-white border border-slate-300 rounded shadow-xs overflow-hidden shrink-0">
                      <img
                        src={config.backgroundImage || ''}
                        alt="Custom Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Custom Uploaded Letterhead Active
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">
                        Using your uploaded company letterhead image.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                    >
                      Replace
                    </button>
                    <button
                      onClick={handleResetToDefault}
                      className="px-2.5 py-1.5 text-xs font-semibold text-[#046eb6] bg-white border border-blue-300 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1"
                      title="Reset back to official default Ratnaafin letterhead"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Default
                    </button>
                  </div>
                </div>
              )}

              {isCodedVector && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Programmatic Vector Letterhead Active
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Rendering vector header and footer directly in code.
                    </div>
                  </div>
                  <button
                    onClick={handleResetToDefault}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#046eb6] hover:bg-[#035b96] rounded-md transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Use Official Letterhead
                  </button>
                </div>
              )}

              {/* Upload Dropzone */}
              {!isCustomUploaded && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 border border-dashed border-slate-300 hover:border-[#046eb6] bg-slate-50/70 hover:bg-blue-50/40 rounded-lg p-3.5 text-center cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#046eb6]" />
                  <span className="text-xs font-medium text-slate-700">
                    Upload another JPG/PNG letterhead to replace
                  </span>
                </div>
              )}
            </div>

            {/* Margin Alignment Controls */}
            {!isCodedVector && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <Sliders className="w-4 h-4 text-[#046eb6]" />
                  2. Text Margin & Placement Tuning
                </div>
                <p className="text-xs text-slate-500">
                  Fine-tune clearances so notice text flows with precision between the printed letterhead header and footer.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Top Header Clearance</span>
                      <span className="font-mono text-[#046eb6] font-bold">{config.topMargin}px</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={220}
                      value={config.topMargin}
                      onChange={(e) =>
                        onChangeConfig({ ...config, topMargin: Number(e.target.value) })
                      }
                      className="w-full accent-[#046eb6] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Bottom Footer Clearance</span>
                      <span className="font-mono text-[#046eb6] font-bold">{config.bottomMargin}px</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={220}
                      value={config.bottomMargin}
                      onChange={(e) =>
                        onChangeConfig({ ...config, bottomMargin: Number(e.target.value) })
                      }
                      className="w-full accent-[#046eb6] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Left Margin</span>
                      <span className="font-mono text-[#046eb6] font-bold">{config.leftMargin}px</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={100}
                      value={config.leftMargin}
                      onChange={(e) =>
                        onChangeConfig({ ...config, leftMargin: Number(e.target.value) })
                      }
                      className="w-full accent-[#046eb6] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Right Margin</span>
                      <span className="font-mono text-[#046eb6] font-bold">{config.rightMargin}px</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={100}
                      value={config.rightMargin}
                      onChange={(e) =>
                        onChangeConfig({ ...config, rightMargin: Number(e.target.value) })
                      }
                      className="w-full accent-[#046eb6] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 text-xs">
                  <button
                    onClick={handleSwitchToCoded}
                    className="text-slate-400 hover:text-slate-600 underline"
                  >
                    Switch to coded vector letterhead
                  </button>
                  <button
                    onClick={() =>
                      onChangeConfig({
                        ...config,
                        topMargin: 140,
                        bottomMargin: 155,
                        leftMargin: 60,
                        rightMargin: 60,
                      })
                    }
                    className="text-slate-600 hover:text-slate-900 underline font-medium"
                  >
                    Reset default margins (140px / 155px)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Scaled Preview (6 cols) */}
          <div className="lg:col-span-6 p-4 bg-slate-100 flex flex-col items-center justify-start overflow-y-auto">
            <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Real-time Letterhead Preview
            </div>
            <div className="w-[360px] h-[510px] bg-white shadow-xl border border-slate-300 overflow-hidden relative rounded-xs">
              <RatnaafinLetterhead
                borrower={sampleBorrower}
                template={template}
                selectedMonth={selectedMonth}
                language={language}
                scale={0.45}
                letterheadConfig={config}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-3 text-center">
              Notice text overlays seamlessly on the official letterhead.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-600 font-medium">
            {isDefaultLetterhead && '✓ Official Ratnaafin Letterhead JPG Active'}
            {isCustomUploaded && '✓ Custom Uploaded Letterhead Active'}
            {isCodedVector && 'Using Programmatic Vector Letterhead'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#046eb6] hover:bg-[#035b96] rounded-lg shadow-xs transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
