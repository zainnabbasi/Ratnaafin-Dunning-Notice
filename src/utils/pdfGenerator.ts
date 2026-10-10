import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { BorrowerRecord, MasterTemplate, NoticeLanguage } from '../types';
import { resolvePdfFilename } from './fileNaming';
import { triggerBrowserDownload } from './fileDownloader';

/**
 * Capture an HTML element and convert it into a high-res A4 PDF Blob.
 * Uses html-to-image to natively support all modern CSS (oklch, color-mix, etc.) without html2canvas CSS parsing bugs.
 */
export async function renderElementToPdfBlob(element: HTMLElement): Promise<Blob> {
  // Wait for webfonts to finish loading (with timeout safeguard)
  if (document.fonts) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
    } catch (_) {}
  }

  // Wait for any embedded images (such as uploaded master letterhead) to be fully loaded
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve(true);
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
            setTimeout(() => resolve(true), 1200);
          })
      )
    );
  }

  // Small delay to ensure styles and canvas buffers are ready
  await new Promise((resolve) => setTimeout(resolve, 40));

  const imgData = await toJpeg(element, {
    quality: 0.95,
    pixelRatio: 2, // High resolution for crisp letterhead print
    backgroundColor: '#ffffff',
    width: 794,
    height: 1123,
    canvasWidth: 794 * 2,
    canvasHeight: 1123 * 2,
    skipFonts: true, // Prevents html-to-image from attempting to inline cross-origin Google Fonts stylesheets
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  return pdf.output('blob');
}

/**
 * Downloads a single notice PDF directly with the resolved email filename.
 */
export async function downloadSinglePdf(
  element: HTMLElement,
  mailId: string,
  lanNumber: string
): Promise<{ filename: string; blob: Blob }> {
  const { filename } = resolvePdfFilename(mailId, lanNumber);
  const blob = await renderElementToPdfBlob(element);
  triggerBrowserDownload(blob, filename);
  return { filename, blob };
}

/**
 * Batch generate all PDFs and compile into a single ZIP file.
 */
export async function generateBatchZip({
  borrowers,
  template,
  selectedMonth,
  language,
  renderBorrowerDom,
  onProgress,
  checkCancelled,
}: {
  borrowers: BorrowerRecord[];
  template: MasterTemplate;
  selectedMonth: string;
  language: NoticeLanguage;
  renderBorrowerDom: (borrower: BorrowerRecord) => Promise<HTMLElement>;
  onProgress: (current: number, total: number, name: string) => void;
  checkCancelled?: () => boolean;
}): Promise<{ zipBlob: Blob; zipFilename: string }> {
  const zip = new JSZip();
  const folder =
    zip.folder(`Ratnaafin_Notices_${selectedMonth}_${language.toUpperCase()}`) || zip;

  const total = borrowers.length;
  const usedFilenames = new Set<string>();

  for (let i = 0; i < total; i++) {
    if (checkCancelled && checkCancelled()) {
      throw new Error('Batch generation cancelled by user.');
    }

    const borrower = borrowers[i];
    onProgress(i + 1, total, borrower.accountName);

    // Compute unique filename
    const { filename } = resolvePdfFilename(borrower.mailId, borrower.lanNumber);
    let finalFilename = filename;
    let duplicateCounter = 1;
    while (usedFilenames.has(finalFilename.toLowerCase())) {
      const base = filename.replace(/\.pdf$/i, '');
      finalFilename = `${base}_${duplicateCounter}.pdf`;
      duplicateCounter++;
    }
    usedFilenames.add(finalFilename.toLowerCase());

    // Render DOM for this borrower
    const container = await renderBorrowerDom(borrower);

    // Generate PDF Blob
    const blob = await renderElementToPdfBlob(container);

    // Add to zip folder
    folder.file(finalFilename, blob);

    // Small yielding break to keep UI responsive and allow DOM updates
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  // Generate ZIP file
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const zipFilename = `Ratnaafin_Dunning_Notices_${selectedMonth}_${language.toUpperCase()}_${borrowers.length}_Accounts.zip`;
  triggerBrowserDownload(zipBlob, zipFilename);

  return { zipBlob, zipFilename };
}
