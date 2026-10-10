import React, { useState } from 'react';
import {
  BorrowerRecord,
  MasterTemplate,
  NoticeLanguage,
  LetterheadConfig,
  DEFAULT_LETTERHEAD_CONFIG,
  DEFAULT_LETTERHEAD_URL,
} from '../types';
import { RatnaafinLogo } from './RatnaafinLogo';

interface RatnaafinLetterheadProps {
  borrower: BorrowerRecord;
  template: MasterTemplate;
  selectedMonth: string;
  language: NoticeLanguage;
  scale?: number;
  printId?: string;
  letterheadConfig?: LetterheadConfig;
}

export const RatnaafinLetterhead: React.FC<RatnaafinLetterheadProps> = ({
  borrower,
  template,
  selectedMonth,
  language,
  scale = 1,
  printId,
  letterheadConfig = DEFAULT_LETTERHEAD_CONFIG,
}) => {
  const [bgLoadError, setBgLoadError] = useState(false);

  // Replace variables in text
  const replaceVars = (text: string) => {
    if (!text) return '';
    return text
      .replace(/{{Account Name}}/g, borrower.accountName || '')
      .replace(/{{New Lan Number}}/g, borrower.lanNumber || '')
      .replace(/{{Emi Amt}}/g, String(borrower.emiAmt || '0'))
      .replace(/{{Total Overdue}}/g, String(borrower.totalOverdue || '0'))
      .replace(/{{EMI Due From}}/g, borrower.emiDueFrom || '')
      .replace(/{{Month}}/g, selectedMonth || '');
  };

  const isGujarati = language === 'gu';
  const effectiveConfig = letterheadConfig || DEFAULT_LETTERHEAD_CONFIG;
  const isCodedVector =
    effectiveConfig.backgroundImage === null || effectiveConfig.backgroundImage === 'coded';
  const hasLetterheadBg = !isCodedVector && !!effectiveConfig.backgroundImage;

  // Margin settings
  const topPad = hasLetterheadBg ? effectiveConfig.topMargin ?? 140 : 48;
  const bottomPad = hasLetterheadBg ? effectiveConfig.bottomMargin ?? 155 : 44;
  const leftPad = hasLetterheadBg ? effectiveConfig.leftMargin ?? 60 : 64;
  const rightPad = hasLetterheadBg ? effectiveConfig.rightMargin ?? 60 : 64;

  const bgSrc = bgLoadError
    ? '/default_letterhead.jpg'
    : effectiveConfig.backgroundImage || DEFAULT_LETTERHEAD_URL;

  return (
    <div
      id={printId}
      className={`relative bg-white text-slate-900 select-none shadow-md mx-auto ${
        isGujarati ? 'font-gujarati' : ''
      }`}
      style={{
        width: '794px', // standard A4 width at 96 DPI
        minHeight: '1123px', // standard A4 height at 96 DPI
        maxHeight: '1123px',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        paddingTop: `${topPad}px`,
        paddingBottom: `${bottomPad}px`,
        paddingLeft: `${leftPad}px`,
        paddingRight: `${rightPad}px`,
        boxSizing: 'border-box',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 1. MASTER OFFICIAL LETTERHEAD BACKGROUND IMAGE (Default) */}
      {hasLetterheadBg && (
        <img
          src={bgSrc}
          alt="Ratnaafin Master Letterhead"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          style={{ zIndex: 0 }}
          onError={() => setBgLoadError(true)}
          loading="eager"
        />
      )}

      {/* 2. PROGRAMMATIC BACKGROUND RUPEE WATERMARK (Only if coded vector mode is active) */}
      {!hasLetterheadBg && (
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.07]"
          style={{ zIndex: 0 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-[420px] h-[420px] fill-slate-800"
            aria-hidden="true"
          >
            <path d="M25 20 h50 v8 h-20 c8 6 12 14 12 24 h-10 c0-7-4-14-12-18 v-6 h-12 v6 h-8 v8 h8 c5 14 16 22 28 24 l18 24 h-12 l-16-22 c-11-2-19-10-24-20 v18 h-8 v-26 h-8 v-8 h8 v-8 z" />
          </svg>
        </div>
      )}

      {/* 3. PROGRAMMATIC TOP HEADER (Only if coded vector mode is active) */}
      {!hasLetterheadBg && (
        <div className="relative z-10 flex justify-end items-start mb-8">
          <RatnaafinLogo size="md" />
        </div>
      )}

      {/* NOTICE BODY */}
      <div className="relative z-10 flex-1 flex flex-col justify-start text-[13.5px] leading-[1.62] text-slate-900">
        {/* Salutation */}
        <div className="font-semibold text-[15px] mb-4 text-slate-950">
          {replaceVars(template.salutation)}
        </div>

        {/* Opening Paragraph */}
        <p className="mb-4 text-justify">
          {replaceVars(template.openingParagraph)}
        </p>

        {/* Dynamic Financial Overdue Table */}
        <div className="my-3 overflow-hidden border border-slate-900">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-50">
                <th className="py-2.5 px-3 font-bold border-r border-slate-900 w-[33%] text-slate-950">
                  {template.tableHeaders.dueDate}
                </th>
                <th className="py-2.5 px-3 font-bold border-r border-slate-900 w-[33%] text-slate-950">
                  {template.tableHeaders.emiAmount}
                </th>
                <th className="py-2.5 px-3 font-bold w-[34%] text-slate-950">
                  {template.tableHeaders.overdueAmount}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2.5 px-3 border-r border-slate-900 font-num text-slate-900">
                  {borrower.emiDueFrom || 'N/A'}
                </td>
                <td className="py-2.5 px-3 border-r border-slate-900 font-num text-slate-900">
                  {borrower.emiAmt}
                </td>
                <td className="py-2.5 px-3 font-num font-semibold text-slate-950">
                  {borrower.totalOverdue}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Default Event Notice */}
        <p className="mt-4 mb-3 text-justify">
          {replaceVars(template.defaultEventParagraph)}
        </p>

        {/* Call to action (if Gujarati or custom) */}
        {template.callToActionParagraph && (
          <p className="mb-3 text-justify">
            {replaceVars(template.callToActionParagraph)}
          </p>
        )}

        {/* Legal Warning Notice */}
        <p className="mb-3 text-justify">
          {replaceVars(template.legalWarningParagraph)}
        </p>

        {/* Disregard if paid note */}
        <p className="mb-6 text-justify">
          {replaceVars(template.disregardParagraph)}
        </p>

        {/* Signoff */}
        <div className="mt-2">
          <div className="font-semibold text-slate-900 mb-2">
            {replaceVars(template.signoffGreeting)}
          </div>
          <div className="font-bold text-[15px] text-slate-950">
            {replaceVars(template.signoffEntity)}
          </div>
        </div>
      </div>

      {/* FOOTER: Ratnaafin Corporate Address & Possible Hai Badge (Only if coded vector mode is active) */}
      {!hasLetterheadBg && (
        <div className="relative z-10 pt-4 border-t border-slate-200 mt-6 flex justify-between items-end text-[9.5px] leading-[1.38] text-slate-600">
          <div className="max-w-[540px]">
            <div className="font-bold text-slate-900 text-[10.5px] mb-1">
              Ratnaafin Capital Private Limited
            </div>
            <div>
              <span className="font-semibold text-slate-700">Corporate Address:</span> 2<sup>nd</sup> & 3<sup>rd</sup> Floor, The Ridge, Opposite Novotel, Iscon Char Rasta, Ahmedabad, Gujarat-380060
            </div>
            <div>
              <span className="font-semibold text-slate-700">Registered Office:</span> 402, Bhikaji Cama Bhawan Ring Road, Bhikaji Cama Place, Near Hyatt Hotel, New Delhi-110066, Delhi, India
            </div>
            <div className="text-slate-700 mt-0.5">
              <span className="font-bold text-slate-900">E</span> info@ratnaafin.com <span className="mx-1 text-slate-400">|</span>
              <span className="font-bold text-slate-900">T</span> 1800 309 8013 <span className="mx-1 text-slate-400">|</span>
              <span className="font-bold text-slate-900">W</span> www.ratnaafin.com
            </div>
            <div className="text-slate-500 font-num mt-0.5">
              CIN U65929DL2018PTC437822
            </div>
          </div>

          {/* Possible Hai Logo */}
          <div className="flex items-center gap-1 font-bold text-lg select-none pb-1">
            <span className="text-[#046eb6]">Possible</span>
            <span className="text-[#10B981] italic">hai!</span>
          </div>
        </div>
      )}
    </div>
  );
};
