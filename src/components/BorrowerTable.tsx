import React, { useState, useMemo } from 'react';
import { BorrowerRecord } from '../types';
import { resolvePdfFilename } from '../utils/fileNaming';
import { Search, Eye, Download, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface BorrowerTableProps {
  records: BorrowerRecord[];
  onPreview: (record: BorrowerRecord) => void;
  onDownloadSingle: (record: BorrowerRecord) => void;
  downloadingId?: string | null;
}

export const BorrowerTable: React.FC<BorrowerTableProps> = ({
  records,
  onPreview,
  onDownloadSingle,
  downloadingId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emailFilter, setEmailFilter] = useState<'all' | 'valid' | 'missing'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const { isMissingEmail } = resolvePdfFilename(r.mailId, r.lanNumber);

      if (emailFilter === 'valid' && isMissingEmail) return false;
      if (emailFilter === 'missing' && !isMissingEmail) return false;

      if (!searchTerm) return true;
      const lower = searchTerm.toLowerCase();
      return (
        r.accountName.toLowerCase().includes(lower) ||
        r.lanNumber.toLowerCase().includes(lower) ||
        r.mailId.toLowerCase().includes(lower) ||
        r.contactNo.includes(lower)
      );
    });
  }, [records, searchTerm, emailFilter]);

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search account name, LAN, email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#046eb6] placeholder:text-slate-400"
          />
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
          <button
            onClick={() => {
              setEmailFilter('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-md transition-colors ${
              emailFilter === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            All Accounts ({records.length})
          </button>
          <button
            onClick={() => {
              setEmailFilter('valid');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-md transition-colors ${
              emailFilter === 'valid'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Valid Emails
          </button>
          <button
            onClick={() => {
              setEmailFilter('missing');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-md transition-colors ${
              emailFilter === 'missing'
                ? 'bg-white text-amber-900 shadow-2xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Missing Email Marker
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold tracking-wide">
              <th className="py-2.5 px-4 w-12 text-slate-400 font-mono">#</th>
              <th className="py-2.5 px-4">Account Name</th>
              <th className="py-2.5 px-4 font-mono">LAN Number</th>
              <th className="py-2.5 px-4 text-right">EMI Amt (₹)</th>
              <th className="py-2.5 px-4 text-right">Overdue (₹)</th>
              <th className="py-2.5 px-4 font-mono">Due Date</th>
              <th className="py-2.5 px-4">Generated PDF Filename</th>
              <th className="py-2.5 px-4 text-right w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  No account records matching current search and filter.
                </td>
              </tr>
            ) : (
              paginated.map((r, idx) => {
                const { filename, isMissingEmail } = resolvePdfFilename(
                  r.mailId,
                  r.lanNumber
                );
                const globalIndex = (currentPage - 1) * pageSize + idx + 1;

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="py-2.5 px-4 font-mono text-slate-400 text-[11px]">
                      {globalIndex}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      <div>{r.accountName}</div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        Ph: {r.contactNo || 'N/A'}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-num text-slate-600">
                      {r.lanNumber}
                    </td>
                    <td className="py-2.5 px-4 text-right font-num text-slate-700">
                      {r.emiAmt}
                    </td>
                    <td className="py-2.5 px-4 text-right font-num font-semibold text-slate-900">
                      {r.totalOverdue}
                    </td>
                    <td className="py-2.5 px-4 font-num text-slate-500 text-[11px]">
                      {r.emiDueFrom}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        {isMissingEmail ? (
                          <span
                            className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                            title="Missing or invalid email. Named by LAN number"
                          >
                            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                            <span className="truncate max-w-[200px]">{filename}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate max-w-[200px]">{filename}</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onPreview(r)}
                          className="p-1.5 text-slate-500 hover:text-[#046eb6] hover:bg-blue-50 rounded-md transition-colors"
                          title="Preview Full Letterhead Notice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDownloadSingle(r)}
                          disabled={downloadingId === r.id}
                          className="p-1.5 text-slate-500 hover:text-[#046eb6] hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
                          title="Download Single PDF"
                        >
                          {downloadingId === r.id ? (
                            <Loader2 className="w-4 h-4 text-[#046eb6] animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-semibold text-slate-800">
            {filteredRecords.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-slate-800">
            {Math.min(currentPage * pageSize, filteredRecords.length)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-800 font-num">
            {filteredRecords.length}
          </span>{' '}
          accounts
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="p-1.5 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-medium font-num">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
